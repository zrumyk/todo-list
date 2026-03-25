const ApiError = require('../../exceptions/api.error');
const UserService = require('../../services/user.service');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('user.service', () => {
    let userService;
    let mockUserRepository;

    beforeEach(() => {
        mockUserRepository = {
            findByEmail: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            deleteUser: jest.fn(),
            update: jest.fn(),
        };
        userService = new UserService(mockUserRepository);
    });

    const userId = 1;
    const hashedPassword = 'hashed_password';
    const token = 'json_web_token';
    const user = {
        username: 'test',
        email: 'test@example.com',
        password: 'password',
    };
    const dbUser = {
        id: 1,
        username: 'test',
        email: 'test@example.com',
        password: 'hashedPassword',
    };

    describe('register user', () => {
        test('should throw an error: User is already exist :(', async () => {
            mockUserRepository.findByEmail.mockResolvedValue(dbUser);

            const result = userService.register(user);

            await expect(result).rejects.toThrow(ApiError);
            expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(
                user.email
            );
            expect(mockUserRepository.create).not.toHaveBeenCalled();
        });

        test('should create new user, return jwt and userData without password', async () => {
            const userHashed = {
                username: 'test',
                email: 'test@example.com',
                password: hashedPassword,
            };

            mockUserRepository.findByEmail.mockResolvedValue(null);
            bcrypt.hash.mockResolvedValue(hashedPassword);
            mockUserRepository.create.mockResolvedValue(dbUser);
            jwt.sign.mockReturnValue(token);

            const result = await userService.register(user);

            expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(
                user.email
            );
            expect(bcrypt.hash).toHaveBeenCalledWith(user.password, 10);
            expect(mockUserRepository.create).toHaveBeenCalledWith(userHashed);
            expect(result).toHaveProperty('token', token);
            expect(result.userData).toBeDefined();
            expect(result.userData).not.toHaveProperty('password');
        });
    });

    describe('login user', () => {
        test('should return an error: User is not exist :(', async () => {
            const user = {
                email: 'test@example.com',
                password: 'password',
            };

            mockUserRepository.findByEmail.mockResolvedValue(null);

            const result = userService.login(user);

            await expect(result).rejects.toThrow(ApiError);
            expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(
                user.email
            );
            expect(bcrypt.compare).not.toHaveBeenCalled();
        });

        test('should return an error: Wrong password :(', async () => {
            const isPasswordEqual = false;

            mockUserRepository.findByEmail.mockResolvedValue(dbUser);
            bcrypt.compare.mockResolvedValue(isPasswordEqual);

            const result = userService.login(user);

            await expect(result).rejects.toThrow(ApiError);
            expect(bcrypt.compare).toHaveBeenCalledWith(
                user.password,
                dbUser.password
            );
            expect(jwt.sign).not.toHaveBeenCalled();
        });

        test('should return jwt and userData without password', async () => {
            const isPasswordEqual = true;

            mockUserRepository.findByEmail.mockResolvedValue(dbUser);
            bcrypt.compare.mockResolvedValue(isPasswordEqual);
            jwt.sign.mockReturnValue(token);

            const result = await userService.login(user);

            expect(result).toHaveProperty('token', token);
            expect(result.userData).toBeDefined();
            expect(result.userData).not.toHaveProperty('password');
        });
    });

    describe('get user by id', () => {
        test('should return an error: User is not exist :(', async () => {
            const userId = 1;

            mockUserRepository.findById.mockResolvedValue(null);

            const result = userService.find(userId);

            await expect(result).rejects.toThrow(ApiError);
            expect(mockUserRepository.findById).toHaveBeenCalledWith(userId);
        });

        test('should return user data without password', async () => {
            const userId = 1;
            const dbUser = {
                id: 1,
                username: 'test',
                email: 'test@example.com',
                password: 'hashedPassword',
            };

            mockUserRepository.findById.mockResolvedValue(dbUser);

            const result = await userService.find(userId);

            expect(result).toBeDefined();
            expect(result).not.toHaveProperty('password');
        });
    });

    describe('delete user', () => {
        test('should return an error: User is not exist :(', async () => {
            mockUserRepository.findById.mockResolvedValue(null);

            const result = userService.delete(userId);

            await expect(result).rejects.toThrow(ApiError);
            expect(mockUserRepository.findById).toHaveBeenCalledWith(userId);
        });

        test('should delete user by id', async () => {
            mockUserRepository.findById.mockResolvedValue(dbUser);
            mockUserRepository.deleteUser.mockResolvedValue(userId);

            const result = await userService.delete(userId);

            expect(result).toBeUndefined();
            expect(mockUserRepository.findById).toHaveBeenCalledWith(userId);
            expect(mockUserRepository.deleteUser).toHaveBeenCalledWith(userId);
        });
    });

    describe('update user data', () => {
        test('should return an error: User is not exist :(', async () => {
            const data = {};

            mockUserRepository.findById.mockResolvedValue(null);

            const result = userService.update(userId, data);

            await expect(result).rejects.toThrow(ApiError);
            expect(mockUserRepository.findById).toHaveBeenCalledWith(userId);
        });

        test('should update password', async () => {
            const data = {
                password: 'newPassword',
            };
            const dataCopy = {
                password: 'hashed_password',
            };

            mockUserRepository.findById.mockResolvedValue(dbUser);
            bcrypt.hash.mockResolvedValue(dataCopy.password);
            mockUserRepository.update.mockResolvedValue(dbUser);

            const result = await userService.update(userId, data);

            expect(result).toBeUndefined();
            expect(bcrypt.hash).toHaveBeenCalledWith(data.password, 10);
            expect(mockUserRepository.update).toHaveBeenCalledWith(
                userId,
                dataCopy
            );
        });

        test('should update username', async () => {
            const data = {
                username: 'newTest',
            };
            const dbUser = {
                id: 1,
                username: 'test',
                email: 'test@example.com',
                password: 'hashedPassword',
            };

            mockUserRepository.findById.mockResolvedValue(dbUser);
            mockUserRepository.update.mockResolvedValue(dbUser);

            const result = await userService.update(userId, data);

            expect(result).toBeDefined();
        });
    });
});

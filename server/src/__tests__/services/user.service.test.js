const ApiError = require('../../exceptions/api.error');
const UserService = require('../../services/user.service');
const bcrypt = require('bcrypt');

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
    const dbUser = {
        id: 1,
        username: 'test',
        email: 'test@example.com',
        password: 'hashedPassword',
    };

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

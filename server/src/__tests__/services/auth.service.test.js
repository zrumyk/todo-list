const AuthService = require('../../services/auth.service');
const ApiError = require('../../exceptions/api.error');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('auth.service', () => {
    let authService;
    let mockUserRepository;

    beforeEach(() => {
        mockUserRepository = {
            findByEmail: jest.fn(),
            create: jest.fn(),
        };
        authService = new AuthService(mockUserRepository);
    });

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

            const result = authService.register(user);

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

            const result = await authService.register(user);

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

            const result = authService.login(user);

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

            const result = authService.login(user);

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

            const result = await authService.login(user);

            expect(result).toHaveProperty('token', token);
            expect(result.userData).toBeDefined();
            expect(result.userData).not.toHaveProperty('password');
        });
    });
});

const UserController = require('../../controllers/user.controller');

describe('user.controller', () => {
    let userController;
    let mockUserService;
    let req, res, next;

    beforeEach(() => {
        mockUserService = {
            register: jest.fn(),
            login: jest.fn(),
            find: jest.fn(),
            delete: jest.fn(),
            update: jest.fn(),
        };
        userController = new UserController(mockUserService);

        req = {
            body: {
                username: 'test',
                email: 'test@example.com',
            },
            user: {
                id: 1,
            },
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });

    describe('register', () => {
        test('should return status 201 and data', async () => {
            const data = { id: 1 };
            mockUserService.register.mockResolvedValue(data);

            await userController.register(req, res, next);

            expect(mockUserService.register).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ success: true, data });
            expect(next).not.toHaveBeenCalled();
        });

        test('should catch an error in next()', async () => {
            const fakeError = new Error('Error :(');
            mockUserService.register.mockRejectedValue(fakeError);

            await userController.register(req, res, next);

            expect(next).toHaveBeenCalledWith(fakeError);
            expect(res.status).not.toHaveBeenCalled();
        });
    });

    describe('login', () => {
        test('should return status 200 and data', async () => {
            const data = { id: 1 };
            mockUserService.login.mockResolvedValue(data);

            await userController.login(req, res, next);

            expect(mockUserService.login).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ success: true, data });
            expect(next).not.toHaveBeenCalled();
        });

        test('should catch an error in next()', async () => {
            const fakeError = new Error('Error :(');
            mockUserService.login.mockRejectedValue(fakeError);

            await userController.login(req, res, next);

            expect(next).toHaveBeenCalledWith(fakeError);
            expect(res.status).not.toHaveBeenCalled();
        });
    });

    describe('find', () => {
        test('should return status 200 and data', async () => {
            const data = { id: 1 };
            mockUserService.find.mockResolvedValue(data);

            await userController.find(req, res, next);

            expect(mockUserService.find).toHaveBeenCalledWith(req.user.id);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ success: true, data });
            expect(next).not.toHaveBeenCalled();
        });

        test('should catch an error in next()', async () => {
            const fakeError = new Error('Error :(');
            mockUserService.find.mockRejectedValue(fakeError);

            await userController.find(req, res, next);

            expect(next).toHaveBeenCalledWith(fakeError);
            expect(res.status).not.toHaveBeenCalled();
        });
    });

    describe('delete', () => {
        test('should return status 204 without data', async () => {
            const data = { id: 1 };
            mockUserService.delete.mockResolvedValue(data);

            await userController.delete(req, res, next);

            expect(mockUserService.delete).toHaveBeenCalledWith(req.user.id);
            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.json).toHaveBeenCalled();
            expect(next).not.toHaveBeenCalled();
        });

        test('should catch an error in next()', async () => {
            const fakeError = new Error('Error :(');
            mockUserService.delete.mockRejectedValue(fakeError);

            await userController.delete(req, res, next);

            expect(next).toHaveBeenCalledWith(fakeError);
            expect(res.status).not.toHaveBeenCalled();
        });
    });

    describe('update', () => {
        test('should return status 200 and data', async () => {
            const data = { id: 1 };
            mockUserService.update.mockResolvedValue(data);

            await userController.update(req, res, next);

            expect(mockUserService.update).toHaveBeenCalledWith(
                req.user.id,
                req.body
            );
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ success: true, data });
            expect(next).not.toHaveBeenCalled();
        });

        test('should catch an error in next()', async () => {
            const fakeError = new Error('Error :(');
            mockUserService.update.mockRejectedValue(fakeError);

            await userController.update(req, res, next);

            expect(next).toHaveBeenCalledWith(fakeError);
            expect(res.status).not.toHaveBeenCalled();
        });
    });
});

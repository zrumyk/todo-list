const bcrypt = require('bcrypt');
const ApiError = require('../exceptions/api.error');

class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async update(userId, data) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw ApiError.BadRequest('User is not exist :(');
        }

        const dataCopy = structuredClone(data);
        if (data.password) {
            dataCopy.password = await bcrypt.hash(data.password, 10);
        }

        await this.userRepository.update(userId, dataCopy);
        return data.username;
    }

    async delete(userId) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw ApiError.BadRequest('User is not exist :(');
        }
        await this.userRepository.deleteUser(userId);
    }
}

module.exports = UserService;
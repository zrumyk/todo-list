const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const ApiError = require('../exceptions/api.error')
const config = require('../configuration/config')

const { jwtSecret, jwtExpiresIn } = config

class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository
    }

    #createJWT(id, email) {
        const payload = {
            id,
            email,
        }

        return jwt.sign(payload, jwtSecret, {
            expiresIn: jwtExpiresIn,
        })
    }

    async update(userId, data) {
        const user = await this.userRepository.findById(userId)
        if (!user) {
            throw ApiError.BadRequest('User is not exist :(')
        }

        const dataCopy = structuredClone(data)
        if (data.password) {
            dataCopy.password = await bcrypt.hash(data.password, 10)
        }

        await this.userRepository.update(userId, dataCopy)

        return data.username
    }

    async delete(userId) {
        const user = await this.userRepository.findById(userId)
        if (!user) {
            throw ApiError.BadRequest('User is not exist :(')
        }

        await this.userRepository.deleteUser(userId)
    }

    async find(userId) {
        const user = await this.userRepository.findById(userId)
        if (!user) {
            throw ApiError.BadRequest('User is not exist :(')
        }

        const { password: _, ...userData } = user

        return userData
    }

    async login(data) {
        const { email, password } = data
        const user = await this.userRepository.findByEmail(email)
        if (!user) {
            throw ApiError.BadRequest('User is not exist :(')
        }

        const isPasswordEqual = await bcrypt.compare(password, user.password)
        if (!isPasswordEqual) {
            throw ApiError.BadRequest('Wrong password :(')
        }

        const token = this.#createJWT(user.id, user.email)

        const { password: _, ...userData } = user

        return { token, userData }
    }

    async register(data) {
        const { username, email, password } = data
        const existingUser = await this.userRepository.findByEmail(email)
        if (existingUser) {
            throw ApiError.BadRequest('User is already exist :(')
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await this.userRepository.create({
            username,
            email,
            password: hashedPassword,
        })

        const token = this.#createJWT(user.id, user.email)

        const { password: _, ...userData } = user

        return { token, userData }
    }
}

module.exports = UserService

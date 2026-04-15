const ApiError = require('../exceptions/api.error');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../configuration/config');

const { jwtSecret, jwtExpiresIn } = config;

class AuthService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  #createJWT(id, username, email) {
    const payload = {
      id,
      username,
      email,
    };

    return jwt.sign(payload, jwtSecret, {
      expiresIn: jwtExpiresIn,
    });
  }

  async login(data) {
    const { email, password } = data;
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw ApiError.BadRequest('User is not exist :(');
    }

    const isPasswordEqual = await bcrypt.compare(password, user.password);
    if (!isPasswordEqual) {
      throw ApiError.BadRequest('Wrong password :(');
    }

    const token = this.#createJWT(user.id, user.username, user.email);
    const { password: _, ...userData } = user;
    return { token, userData };
  }

  async register(data) {
    const { username, email, password } = data;
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw ApiError.BadRequest('User is already exist :(');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userRepository.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = this.#createJWT(user.id, user.username, user.email);
    const { password: _, ...userData } = user;
    return { token, userData };
  }

  async getMe(userId) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw ApiError.BadRequest('User is not exist :(');
    }

    const { password: _, ...userData } = user;
    return userData;
  }
}

module.exports = AuthService;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ApiError = require("../exceptions/api.error");
const config = require("../configuration/config");

const { jwtSecret, jwtExpiresIn } = config;

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  #createJWT(id, email) {
    const payload = {
      id,
      email,
    };

    return jwt.sign(payload, jwtSecret, {
      expiresIn: jwtExpiresIn,
    });
  }

  async changeName(userId, { newUsername }) {
    const updatedUser = await this.userRepository.changeName(userId, newUsername);

    const { password: _, ...userData } = updatedUser;
    return userData;
  }

  async changePassword(userId, { newPassword }) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.userRepository.changePassword(userId, hashedPassword);
  }

  async getUser(userId) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw ApiError.BadRequest("User is not exist :(");
    }

    const { password: _, ...userData } = user;

    return userData;
  }

  async login(data) {
    const { email, password } = data;
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw ApiError.BadRequest("User is not exist :(");
    }

    const isPasswordEqual = await bcrypt.compare(password, user.password);
    if (!isPasswordEqual) {
      throw ApiError.BadRequest("Wrong password :(");
    }

    const token = this.#createJWT(user.id, user.email);

    const { password: _, ...userData } = user;

    return { token, userData };
  }

  async register(data) {
    const { username, email, password } = data;
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw ApiError.BadRequest("User is already exist :(");
    }

    const hashedPasword = await bcrypt.hash(password, 10);

    const user = await this.userRepository.createUser({
      username,
      email,
      password: hashedPasword,
    });

    const token = this.#createJWT(user.id, user.email);

    const { password: _, ...userRes } = user;

    return { token, userRes };
  }
}

module.exports = UserService;

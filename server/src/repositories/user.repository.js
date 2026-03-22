class UserRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async createUser(data) {
    return await this.prisma.user.create({ data });
  }

  async changeName(id, newUsername) {
    return await this.prisma.user.update({
      where: { id: Number(id) },
      data: { username: newUsername },
    });
  }

  async changePassword(id, newPassword) {
    await this.prisma.user.update({
      where: { id: Number(id) },
      data: { password: newPassword },
    });
  }

  async deleteUser() {}

  async findByEmail(email) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id) {
    return await this.prisma.user.findUnique({
      where: { id: Number(id) },
    });
  }
}

module.exports = UserRepository;

class UserRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }

    async create(data) {
        return this.prisma.user.create({ data });
    }

    async update(userId, data) {
        await this.prisma.user.update({
            where: { id: Number(userId) },
            data,
        });
    }

    async delete(userId) {
        await this.prisma.user.delete({
            where: { id: Number(userId) },
        });
    }

    async findByEmail(email) {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }

    async findById(userId) {
        return this.prisma.user.findUnique({
            where: { id: Number(userId) },
        });
    }
}

module.exports = UserRepository;

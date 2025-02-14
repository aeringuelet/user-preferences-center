import { PrismaClient } from '@prisma/client';
import { UserStore } from './UserStore';

class UserStorePrismaImpl implements UserStore {
    private prisma: PrismaClient;

    constructor(client: PrismaClient) {
        this.prisma = client;
    }

    getById: UserStore['getById'] = async (id: number) => {
        return await this.prisma.user.findUnique({
            where: {
                id,
            },
        });
    };
}

export const UserStorePrisma = (client: PrismaClient) =>
    new UserStorePrismaImpl(client);

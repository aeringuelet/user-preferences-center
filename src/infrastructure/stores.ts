import { PrismaClient } from '@prisma/client';
import { UserStore } from './UserStore';
import { UserStorePrisma } from './UserStorePrisma';

export const createStores = (prisma: PrismaClient) => {
    return {
        userStore: UserStorePrisma(prisma),
    };
};

export type Stores = {
    userStore: UserStore;
};

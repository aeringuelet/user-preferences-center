import { PrismaClient } from '@prisma/client';
import { ConsentChangeEventStore } from './ConsentChangeEventStore';
import { ConsentChangeEventStorePrisma } from './ConsentChangeEventStorePrisma';
import { ConsentStore } from './ConsentStore';
import { ConsentStorePrisma } from './ConsentStorePrisma';
import { UserStore } from './UserStore';
import { UserStorePrisma } from './UserStorePrisma';

export const createStores = (prisma: PrismaClient) => {
    return {
        userStore: UserStorePrisma(prisma),
        consentStore: ConsentStorePrisma(prisma),
        consentChangeEventStore: ConsentChangeEventStorePrisma(prisma),
    };
};

export type Stores = {
    userStore: UserStore;
    consentStore: ConsentStore;
    consentChangeEventStore: ConsentChangeEventStore;
};

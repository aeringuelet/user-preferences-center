import { Consent, PrismaClient } from '@prisma/client';
import { ConsentStore } from './ConsentStore';

class ConsentStorePrismaImpl implements ConsentStore {
    constructor(private readonly prisma: PrismaClient) {}

    upsert: ConsentStore['upsert'] = async (consent: Omit<Consent, 'id'>) => {
        return await this.prisma.consent.upsert({
            where: {
                userId_type: { userId: consent.userId, type: consent.type },
            },
            update: { value: consent.value },
            create: { ...consent },
        });
    };
}

export const ConsentStorePrisma = (client: PrismaClient) =>
    new ConsentStorePrismaImpl(client);

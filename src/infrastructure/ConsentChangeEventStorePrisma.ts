import { ConsentChangeEvent, PrismaClient } from '@prisma/client';
import { ConsentChangeEventStore } from './ConsentChangeEventStore';

class ConsentChangeEventStorePrismaImpl implements ConsentChangeEventStore {
    constructor(private readonly prisma: PrismaClient) {}
    getByUserId: ConsentChangeEventStore['getByUserId'] = async (userId) => {
        return await this.prisma.consentChangeEvent.findMany({
            where: {
                userId,
            },
        });
    };

    create: ConsentChangeEventStore['create'] = async (
        consentChangeEvent: Omit<ConsentChangeEvent, 'id'>
    ) => {
        await this.prisma.consentChangeEvent.create({
            data: consentChangeEvent,
        });
    };
}

export const ConsentChangeEventStorePrisma = (prismaClient: PrismaClient) =>
    new ConsentChangeEventStorePrismaImpl(prismaClient);

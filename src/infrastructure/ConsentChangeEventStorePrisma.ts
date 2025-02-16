import { ConsentChangeEvent, PrismaClient } from '@prisma/client';
import { ConsentChangeEventStore } from './ConsentChangeEventStore';

class ConsentChangeEventStorePrismaImpl {
    constructor(private readonly prisma: PrismaClient) {}

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

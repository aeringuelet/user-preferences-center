import { ConsentChangeEvent } from '@prisma/client';

export interface ConsentChangeEventStore {
    create(consentChangeEvent: Omit<ConsentChangeEvent, 'id'>): Promise<void>;
    getByUserId(userId: number): Promise<ConsentChangeEvent[]>;
}

import { ConsentChangeEvent } from '@prisma/client';

export interface ConsentChangeEventStore {
    create(consentChangeEvent: Omit<ConsentChangeEvent, 'id'>): Promise<void>;
}

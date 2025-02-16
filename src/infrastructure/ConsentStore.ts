import { Consent } from '@prisma/client';

export interface ConsentStore {
    upsert(consent: Omit<Consent, 'id'>): Promise<Consent>;
}

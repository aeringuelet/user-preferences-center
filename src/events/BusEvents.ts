import { Consent } from '@prisma/client';

type UserConsentUpdatedEvent = {
    type: 'user.consent.updated';
    data: {
        userId: number;
        consent: Omit<Consent, 'id'>;
    };
};

export type BusEvent = UserConsentUpdatedEvent;

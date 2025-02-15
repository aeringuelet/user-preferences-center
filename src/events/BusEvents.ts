import { Consent } from '@prisma/client';

type UserConsentUpdatedEvent = {
    type: 'user.consent.updated';
    data: {
        userId: number;
        consent: Consent;
    };
};

export type BusEvent = UserConsentUpdatedEvent;

import { Consent, ConsentChangeEvent } from '@prisma/client';
import { BusEvent } from '../events/BusEvents';
import { EventBus } from '../events/EventBus';
import { ConsentChangeEventStore } from '../infrastructure/ConsentChangeEventStore';
import { ConsentStore } from '../infrastructure/ConsentStore';

class ConsentServiceImpl {
    constructor(
        private readonly consentStore: ConsentStore,
        private readonly consentChangeEventStore: ConsentChangeEventStore,
        private readonly eventBus: EventBus<BusEvent>
    ) {
        eventBus.subscribe('user.consent.updated', async (event) => {
            await this.consentStore.upsert(event.data.consent);

            const consentChangeEvent: Omit<ConsentChangeEvent, 'id'> = {
                userId: event.data.userId,
                type: event.data.consent.type,
                value: event.data.consent.value,
                timestamp: new Date(),
            };
            await this.consentChangeEventStore.create(consentChangeEvent);
        });
    }

    createOrUpdate = (consent: Omit<Consent, 'id'>) => {
        this.eventBus.push({
            type: 'user.consent.updated',
            data: {
                userId: consent.userId,
                consent,
            },
        });
    };
}

export const ConsentService = (
    consentStore: ConsentStore,
    consentChangeEventStore: ConsentChangeEventStore,
    eventBus: EventBus<BusEvent>
) => new ConsentServiceImpl(consentStore, consentChangeEventStore, eventBus);
export type ConsentService = ReturnType<typeof ConsentService>;

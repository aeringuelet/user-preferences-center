import { Consent } from '@prisma/client';
import { EventBus } from '../events/EventBus';

class ConsentServiceImpl {
    constructor(private readonly eventBus: EventBus) {
        eventBus.subscribe('user.consent.updated', (event) => {
            console.log(event);
        });
    }

    create = (consent: Omit<Consent, 'id'>) => {
        this.eventBus.push({
            type: 'user.consent.updated',
            data: {
                consent,
            },
        });
    };
}

export const ConsentService = (eventBus: EventBus) =>
    new ConsentServiceImpl(eventBus);
export type ConsentService = ReturnType<typeof ConsentService>;

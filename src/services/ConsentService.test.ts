import { Consent } from '@prisma/client';
import { describe, expect, it, vi } from 'vitest';
import { InMemoryEventBus } from '../events/InMemoryEventBus';
import { ConsentChangeEventStore } from '../infrastructure/ConsentChangeEventStore';
import { ConsentStore } from '../infrastructure/ConsentStore';
import { ConsentService } from './ConsentService';

describe('ConsentService', () => {
    it('should create a consent', () => {
        const [
            eventBus,
            { consentStore, consentChangeEventStore },
            { consentService },
        ] = make();

        const eventBusPushSpy = vi.spyOn(eventBus, 'push');
        const consentStoreUpsertSpy = vi.spyOn(consentStore, 'upsert');
        const consentChangeEventStoreCreateSpy = vi.spyOn(
            consentChangeEventStore,
            'create'
        );

        const consent: Consent = {
            id: 1,
            userId: 1,
            type: 'email_notifications',
            value: true,
        };

        consentService.createOrUpdate(consent);

        expect(eventBusPushSpy).toHaveBeenCalledWith({
            type: 'user.consent.updated',
            data: {
                userId: 1,
                consent: {
                    id: 1,
                    userId: 1,
                    type: 'email_notifications',
                    value: true,
                },
            },
        });

        vi.waitFor(() => {
            expect(consentStoreUpsertSpy).toHaveBeenCalledWith({
                id: 1,
                userId: 1,
                type: 'email_notifications',
                value: true,
            });
            expect(consentChangeEventStoreCreateSpy).toHaveBeenCalledWith({
                userId: 1,
                type: 'email_notifications',
                value: true,
                timestamp: expect.any(Date),
            });
        });
    });
});

function make() {
    const consentStore: ConsentStore = {
        upsert: async (consent) => {
            return { id: 1, ...consent };
        },
    };
    const consentChangeEventStore: ConsentChangeEventStore = {
        create: async (_) => void 0,
        getByUserId: async (_) => {
            return [];
        },
    };

    const eventBus = InMemoryEventBus();

    const consentService = ConsentService(
        consentStore,
        consentChangeEventStore,
        eventBus
    );

    return [
        eventBus,
        { consentStore, consentChangeEventStore },
        { consentService },
    ] as const;
}

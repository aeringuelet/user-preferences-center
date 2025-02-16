import { BusEvent } from '../events/BusEvents';
import { EventBus } from '../events/EventBus';
import { Stores } from '../infrastructure';
import { ConsentService } from './ConsentService';
import { UserService } from './UserService';

export const createServices = (
    eventBus: EventBus<BusEvent>,
    stores: Stores
) => {
    return {
        userService: UserService(stores.userStore),
        consentService: ConsentService(
            stores.consentStore,
            stores.consentChangeEventStore,
            eventBus
        ),
    };
};

export type Services = {
    userService: ReturnType<typeof UserService>;
    consentService: ReturnType<typeof ConsentService>;
};

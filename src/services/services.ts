import { EventBus } from '../events/EventBus';
import { Stores } from '../infrastructure/stores';
import { ConsentService } from './ConsentService';
import { UserService } from './UserService';

export const createServices = (stores: Stores, eventBus: EventBus) => {
    return {
        userService: UserService(stores.userStore),
        consentService: ConsentService(eventBus),
    };
};

export type Services = {
    userService: ReturnType<typeof UserService>;
    consentService: ReturnType<typeof ConsentService>;
};

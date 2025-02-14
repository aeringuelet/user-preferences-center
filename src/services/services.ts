import { Stores } from '../infrastructure/stores';
import { userService } from './UserService';

export const createServices = (stores: Stores) => {
    return {
        userService: userService(stores.userStore),
    };
};

export type Services = {
    userService: ReturnType<typeof userService>;
};

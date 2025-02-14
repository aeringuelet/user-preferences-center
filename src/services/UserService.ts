import { UserStore } from '../infrastructure/UserStore';

class UserServiceImpl {
    constructor(private readonly userStore: UserStore) {}

    getById = (id: number) => {
        return this.userStore.getById(id);
    };
}

export const userService = (userStore: UserStore) =>
    new UserServiceImpl(userStore);
export type UserService = ReturnType<typeof userService>;

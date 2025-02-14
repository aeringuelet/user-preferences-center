import { User } from '@prisma/client';

export interface UserStore {
    getById(id: number): Promise<User | null>;
}

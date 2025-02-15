import { Consent, User } from '@prisma/client';

export interface UserStore {
    getById(id: number): Promise<(User & { consents: Consent[] }) | null>;
    create(user: Pick<User, 'email'>): Promise<User>;
}

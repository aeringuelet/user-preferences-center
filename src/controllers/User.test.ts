import { Consent, User } from '@prisma/client';
import { describe, expect, it, vi } from 'vitest';
import { UserStore } from '../infrastructure/UserStore';
import { UserService } from '../services/UserService';
import { userController } from './User';
import { superTestServer } from './utils/SuperTestServer';

describe('UserController', () => {
    describe('POST user', () => {
        const [{ userStore }, server] = make();

        it('should create a user', async () => {
            const user: User = { email: 'test@test.com', id: 1 };

            const userStoreCreateSpy = vi.spyOn(userStore, 'create');
            userStoreCreateSpy.mockReturnValue(Promise.resolve(user));

            const res = await server.post('/user').send({
                user,
            });

            expect(res.status).toEqual(201);
            expect(res.body).toEqual({ ok: true, user });
        });

        it('should fail if no email is provided', async () => {
            const res = await server.post('/user').send();

            expect(res.status).toEqual(400);
            expect(res.body).toEqual({
                ok: false,
                message: expect.any(String),
            });
        });
    });

    describe('GET user', () => {
        const [{ userStore }, server] = make();

        it('should return a user', async () => {
            const userWithConsents: User & { consents: Consent[] } = {
                id: 1,
                email: 'test@test.com',
                consents: [],
            };

            const userStoreCreateSpy = vi.spyOn(userStore, 'getById');
            userStoreCreateSpy.mockReturnValue(
                Promise.resolve(userWithConsents)
            );

            const res = await server.get('/user/1');

            expect(res.status).toEqual(200);
            expect(res.body).toEqual({ ok: true, user: userWithConsents });
        });
    });
});

function make() {
    const userStore: UserStore = {
        getById: async (_) => null,
        create: async (user) => ({ id: 1, ...user }),
    };

    const services = {
        userService: UserService(userStore),
    };

    const server = superTestServer('/user', userController(services));

    return [{ userStore }, server] as const;
}

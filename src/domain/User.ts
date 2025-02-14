import { Consent } from './Consent';

export type User = {
    id: number;
    email: string;
    consents: Consent[];
};

import { User } from './User';

export enum ConsentType {
    EMAIL_NOTIFICATIONS = 'email_notifications',
    SMS_NOTIFICATIONS = 'sms_notifications',
}

export type Consent = {
    id: number;
    user: User;
    type: ConsentType;
    value: boolean;
};

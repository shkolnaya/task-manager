import { Moment } from "moment";

export interface User {
    fullName: string,
    phoneNumber?: string,
    birthday?: Moment,
    biography?: string,
    email?: string 
}

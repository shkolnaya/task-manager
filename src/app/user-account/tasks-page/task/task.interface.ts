import { Moment } from "moment";

export interface Task {
    name: string;
    description?: string;
    category: string;
    date: Moment;
}

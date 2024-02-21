import { Moment } from "moment";

export interface Task {
    name: string;
    description: string | null;
    category: string;
    date: Moment;
    isDone: boolean;
}

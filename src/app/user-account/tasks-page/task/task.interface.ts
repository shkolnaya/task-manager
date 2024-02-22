import { Moment } from "moment";

export interface Task {
    name: string;
    description: string | null;
    project: number;
    date: Moment;
    isDone: boolean;
}

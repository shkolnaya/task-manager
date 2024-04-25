import { Moment } from "moment";

export interface Task {
    id: number,
    name: string;
    description: string | null;
    projectId: number;
    projectName: string;
    date: Moment;
    isDone: boolean;
}

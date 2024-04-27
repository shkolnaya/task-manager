import { Project } from "../../projects-page/project.interface";

export interface CompleteProject {
    project: Project,
    tasksInProjectCount: number,
    completedTasksInProjectCount: number
}

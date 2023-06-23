export interface ITask {
    id: number,
    name: string,
    description?: string,
    parentTaskId?: number
}

export interface ITaskForm {
    name: string,
    description?: string,
    parentTaskId?: number
}
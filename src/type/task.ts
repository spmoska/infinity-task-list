export interface ITask {
    id: number,
    name: string,
    description: string,
    children?: ITask[]
}

export interface ITaskForm {
    name: string,
    description?: string,
    parentTask?: number
}
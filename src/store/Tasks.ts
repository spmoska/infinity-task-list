import {makeAutoObservable} from "mobx";
import {ITask, ITaskForm} from "../type/task";

class Tasks {
    constructor() {
        makeAutoObservable(this);
    };

    tasks: ITask[] = [
        
    ] as ITask[];
    setTasks = (data: ITask[]) => this.tasks = data;

    selectedTasks: ITask[] = [] as ITask[];
    setSelectedTask = (data: ITask[]) => this.selectedTasks = data

    task: ITask | undefined = {} as ITask | undefined;
    setTask = (data: ITask) => this.task = data;

    getChildrenTaskList = (parentTaskId: number) => {
        return this.tasks.filter(task => task.parentTaskId === parentTaskId)
    }

    addTask = (data: ITaskForm) => {
        this.setTasks([...this.tasks,
            {
                id: this.tasks.length + 1,
                name: data.name,
                description: data.description,
                parentTaskId: data.parentTaskId
            }])

        return this.tasks
    }

    getTask = (taskId: number) => {
        this.setTask(this.tasks.filter(task => task.id === taskId)[0])
    }
}

// eslint-disable-next-line
export default new Tasks();
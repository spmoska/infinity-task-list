import {makeAutoObservable} from "mobx";
import {ITask, ITaskForm} from "../type/task";

class Tasks {
    constructor() {
        makeAutoObservable(this);
    };

    tasks: ITask[] = [] as ITask[];
    setTasks = (data: ITask[]) => this.tasks = data;

    addTask = async (data: ITaskForm) => {

    }
}

// eslint-disable-next-line
export default new Tasks()
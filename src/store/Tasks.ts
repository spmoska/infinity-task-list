import {makeAutoObservable} from "mobx";
import {ITask, ITaskForm} from "../type/task";

class Tasks {
    constructor() {
        makeAutoObservable(this);
    };

    tasks: ITask[] = [] as ITask[];
    setTasks = (data: ITask[]) => this.tasks = data;

    selectedTasks: ITask[] = [] as ITask[];
    setSelectedTask = (data: ITask[]) => this.selectedTasks = data

    task: ITask = {} as ITask;
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

        this.updateLocalStorage();

        return this.tasks
    }

    selectTask = (taskId: number) => {
        const selectedTask = this.tasks.find(task => task.id === taskId)
        const childrenTasks = this.tasks.filter(task => task.parentTaskId === taskId)
        this.setSelectedTask([...this.selectedTasks, selectedTask!])

        childrenTasks.forEach(task => this.selectTask(task.id))

        return this.selectedTasks
    }

    deselectTask = (taskId: number) => {
        this.setSelectedTask(this.selectedTasks.filter(task => task.id !== taskId))

        return this.selectedTasks
    }

    deleteSelectedTasks = () => {
        this.setTasks(this.tasks.filter(task => !this.selectedTasks.includes(task)))

        if (!this.tasks.includes(this.task)) this.setTask({} as ITask)

        this.updateLocalStorage()

        return this.tasks
    }

    getTask = (taskId: number) => {
        this.setTask(this.tasks.filter(task => task.id === taskId)[0])

        return this.task
    }

    getTasksFromLocalStorage = () => {
        if (localStorage.getItem('tasks') !== null)
            this.setTasks(JSON.parse(localStorage.getItem('tasks')!))
    }

    updateLocalStorage = () => {
        localStorage.setItem('tasks', JSON.stringify(this.tasks))
    }
}

// eslint-disable-next-line
export default new Tasks();
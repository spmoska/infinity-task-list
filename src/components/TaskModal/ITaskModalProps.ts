import {ITaskForm} from "../../type/task";

export interface ITaskModalProps {
    open: boolean,
    loading: boolean,
    onCancel: () => void,
    onFinish: (data: ITaskForm) => void,
    initialValues?: ITaskForm
}
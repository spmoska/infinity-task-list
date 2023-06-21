import {ITaskForm} from "../../type/task";

export interface ITaskModalProps {
    open: boolean,
    loading: boolean,
    onCancel: () => void,
    onFinish: () => void,
    initialValues?: ITaskForm
}
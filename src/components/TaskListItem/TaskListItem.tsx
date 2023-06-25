import React, {FC, useEffect, useState} from 'react';
import {ITaskListItemProps} from "./ITaskListItemProps";
import {ITask} from "../../type/task";
import tasks from "../../store/Tasks";
import style from './TaskListItem.module.scss'
import {Checkbox, message} from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import {observer} from "mobx-react-lite";

const TaskListItem: FC<ITaskListItemProps> = ({task, childrenStyle}) => {
    const [childrenList, setChildrenList] = useState<ITask[]>([]);
    const [childrenOpen, setChildrenOpen] = useState<boolean>(false);

    useEffect(() => {
        setChildrenList(tasks.getChildrenTaskList(task.id))
        // eslint-disable-next-line
    }, [tasks.tasks])

    const onCheck = (e: CheckboxChangeEvent) => {
        if (e.target.checked) tasks.selectTask(task.id)
        else tasks.deselectTask(task.id);
    }

    const taskClickHandler = () => {
        try {
            tasks.getTask(task.id);
        } catch (e) {
            message.error('Ошибка загрузки задач!');
        }
    }

    return (
        <div style={childrenStyle}>
            <div className={style.list__item}>
                <div className={style.task}>
                    {
                        childrenList.length > 0
                            ?
                            <div className={childrenOpen ? style.arrow__open : style.arrow__close}
                                 onClick={() => setChildrenOpen(prev => !prev)}
                            ></div>
                            : null
                    }
                    <div className={style.task__name} onClick={taskClickHandler}>{task.name}</div>
                </div>
                <Checkbox onChange={onCheck}
                          checked={!!tasks.selectedTasks.find(selectedTask => selectedTask.id === task.id)}
                ></Checkbox>
            </div>
            <>
                {
                    childrenList.length > 0 && childrenOpen
                        ?
                        childrenList.map(childrenTask =>
                            <TaskListItem task={childrenTask} childrenStyle={{margin: '5px 0 5px 10px'}}
                                          key={childrenTask.id}/>
                        )
                        : null
                }
            </>
        </div>
    );
};

export default observer(TaskListItem);
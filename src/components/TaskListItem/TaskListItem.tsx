import React, {FC, useEffect, useState} from 'react';
import {ITaskListItemProps} from "./ITaskListItemProps";
import {ITask} from "../../type/task";
import tasks from "../../store/Tasks";
import style from './TaskListItem.module.scss'
import { Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import {observer} from "mobx-react-lite";

const TaskListItem: FC<ITaskListItemProps> = ({task, childrenStyle}) => {
    const [childrenList, setChildrenList] = useState<ITask[]>();

    useEffect(() => {
        setChildrenList(tasks.getChildrenTaskList(task.id))
    }, [tasks.tasks])

    const onCheck = (e: CheckboxChangeEvent) => {
        if (e.target.checked) tasks.selectTask(task.id)
        else tasks.deselectTask(task.id);
    }

    return (
        <div style={childrenStyle}>
            <div className={style.task}>
                <p>{task.name}</p>
                <Checkbox onChange={onCheck}
                          checked={!!tasks.selectedTasks.find(selectedTask => selectedTask.id === task.id)}
                ></Checkbox>
            </div>
            <>
                {
                    childrenList
                        ?
                        childrenList.map(childrenTask =>
                            <TaskListItem task={childrenTask} childrenStyle={{margin: '5px 0 5px 10px'}} key={childrenTask.id}/>
                        )
                        : null
                }
            </>
        </div>
    );
};

export default observer(TaskListItem);
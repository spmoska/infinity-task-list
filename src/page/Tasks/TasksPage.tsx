import React from 'react';
import {useState} from "react";
import {ITaskForm} from "../../type/task";
import tasks from "../../store/Tasks";
import {Button, Card, Col, message, Row} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import TaskModal from "../../components/TaskModal/TaskModal";
import {observer} from "mobx-react-lite";
import TaskListItem from "../../components/TaskListItem/TaskListItem";

const TasksPage = () => {
    const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const createNewTask = async (data: ITaskForm) => {
        setLoading(true);
        try {
            tasks.addTask(data);
            setCreateModalOpen(false);
        } catch (e) {
            message.error('Ошибка добавления задачи!');
        }
        setLoading(false);
    }

    return (
        <>
            <Card style={{width: '100%', maxHeight: '80vh', margin: '20px'}}>
                <Row gutter={[20, 20]}>
                    <Col xs={24} lg={12}>
                        <Card title='Список задач' actions={[
                            <Button
                                onClick={() => setCreateModalOpen(true)}
                                icon={<EditOutlined/>}
                            >Добавить задачу</Button>,
                            <Button
                                icon={<DeleteOutlined/>}
                                danger
                                type='primary'
                            >Удалить выбранные</Button>
                        ]}
                        >
                            {
                                tasks.tasks.filter(task => task.parentTaskId === undefined).map(task =>
                                    <TaskListItem task={task} key={task.id}/>
                                )
                            }
                        </Card>
                    </Col>
                    <Col xs={24} lg={12}>
                        <Card title='Задача №1'>
                        </Card>
                    </Col>
                </Row>
            </Card>

            <TaskModal
                open={createModalOpen}
                loading={loading}
                onCancel={() => setCreateModalOpen(false)}
                onFinish={createNewTask}
            />
        </>
    );
};

export default observer(TasksPage);
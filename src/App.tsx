import React, {useState} from 'react';
import {Button, Card, Col, Row} from "antd";
import {EditOutlined} from "@ant-design/icons";
import TaskModal from "./components/TaskModal/TaskModal";


function App() {
    const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const createNewTask = () => {

    }

    return (
        <>
            <Card style={{width: '100%', maxHeight: '80vh', margin: '20px'}}>
                <Row gutter={[20, 20]}>
                    <Col xs={24} lg={12}>
                        <Card title='Список задач' actions={[
                            <Button
                            onClick={() => setCreateModalOpen(true)}
                            icon={<EditOutlined/>}>Добавить задачу</Button>
                        ]}></Card>
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
}

export default App;

import React, {FC, useEffect, useState} from 'react';
import {Button, Form, Input, Modal, Select} from "antd";
import {ITaskModalProps} from "./ITaskModalProps";
import tasks from "../../store/Tasks";

const requiredFormItem = {
    required: true,
    message: ''
}

const {TextArea} = Input;

interface IOption {
    value: number,
    label: string
}

const TaskModal: FC<ITaskModalProps> = ({open, onCancel, initialValues, onFinish, loading}) => {
    const [options, setOptions] = useState<IOption[]>();

    useEffect(() => {
        setOptions(tasks.tasks.map(task => {
            return {
                value: task.id,
                label: task.name
            }
        }))
    }, [])

    return (
        <Modal
            destroyOnClose
            title={initialValues ? initialValues.name : 'Новая задача'}
            open={open}
            onCancel={onCancel}
            footer={null}
            width={800}
        >
            <Form labelCol={{span: 8}} wrapperCol={{span: 16}} labelAlign='left' onFinish={onFinish} initialValues={initialValues}>
                <Form.Item name='name' label='Наименование' rules={[requiredFormItem]}>
                    <Input placeholder='Название задачи'/>
                </Form.Item>
                <Form.Item name='description' label='Описание'>
                    <TextArea placeholder='Описание задачи'/>
                </Form.Item>
                <Form.Item name='parentTask' label='Задача верхнего уровня'>
                    <Select
                        showSearch
                        placeholder="Задача верхнего уровня"
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={options}
                    />
                </Form.Item>
                <Form.Item style={{display: 'flex', justifyContent: 'right'}}>
                    <Button htmlType='submit' type='primary' loading={loading}>{initialValues ? 'Редактировать' : 'Добавить'}</Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default TaskModal;
import React from 'react';
import { Button, Form, Input, InputNumber, Modal, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../actions/ui';
import { startAddNewProject } from '../../actions/proyecto';
const { Title } = Typography;

export const ModalAdd = () => {

    const { modalOpen } = useSelector(state => state.ui);
    const dispatch = useDispatch();

    const handleCancel = () => {
        dispatch(closeModal());
    };
    const handleAdd = (values) => {
        const { title, presupuestoInicial } = values
        dispatch(startAddNewProject(title, presupuestoInicial));
        dispatch(closeModal());
    }
    return (
        <Modal
            title={<Title
                align="center"
                level={3}
            >
                Nuevo Proyecto
                    </Title>}
            visible={modalOpen}
            onOk={handleAdd}
            onCancel={handleCancel}
            destroyOnClose={true}
            footer={[
                <Button
                    form="addForm"
                    type="primary"
                    key="submit"
                    htmlType="submit"
                >
                    Guardar
                          </Button>
            ]}
        >
            <Form
                id="addForm"
                onFinish={handleAdd}
            >
                <Form.Item
                    label="Nombre del projecto"
                    name="title"
                    rules={[{ required: true, message: 'Por favor ingrese un nombre Valido!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Presupuesto Establecido"
                    name="presupuestoInicial"
                    rules={[{
                        required: true,
                        type: 'number',
                        message: 'Ingrese un numero mayor que 0'
                    }]}
                >
                    <InputNumber />
                </Form.Item>


            </Form>
        </Modal>
    )
}

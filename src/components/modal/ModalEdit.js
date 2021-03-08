
import { Button, Form, Input, InputNumber, Modal, Typography } from 'antd'
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startEditingProject } from '../../actions/proyecto';
import { closeModalEdit } from '../../actions/ui';

const { Title } = Typography;
export const ModalEdit = () => {

    const { modalEditOpen } = useSelector(state => state.ui);
    const { activeProject } = useSelector(state => state.proyecto);
    const dispatch = useDispatch();

    const { id, title, presupuestoInicial, total } = activeProject;


    const handleCancel = () => {
        dispatch(closeModalEdit());
    };

    const handleEdit = (values) => {
        const newProject = {
            title: values.title,
            presupuestoInicial: values.presupuestoInicial,
            total
        }
        console.log(newProject);
        dispatch(startEditingProject(id, newProject))
        dispatch(closeModalEdit());
    }

    return (
        <Modal
            title={
                <Title align="center" level={3}> Editar Proyecto </Title>
            }
            visible={modalEditOpen}
            onCancel={handleCancel}
            destroyOnClose={true}
            footer={[
                <Button
                    form="editForm"
                    type="primary"
                    key="submit"
                    htmlType="submit"
                >
                    Guardar
                          </Button>
            ]}
        >
            <Form
                id="editForm"
                onFinish={handleEdit}
                initialValues={{
                    title,
                    presupuestoInicial
                }}
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
                        min: 1,
                        message: 'Ingrese un numero mayor que 0'
                    }]}
                >
                    <InputNumber />
                </Form.Item>


            </Form>

        </Modal>
    )
}

import React, { useEffect, useState } from 'react';
import { Form, Input, Button, InputNumber, Typography, Divider } from 'antd';
import { SaveOutlined } from '@ant-design/icons'
import { Redirect, useHistory } from 'react-router-dom';
// import { useHideMenu } from '../hooks/useHideMenu';
import { getUsuarioStorage } from '../helper/getUsuarioStorage';
import { useDispatch } from 'react-redux';
import { showMenu } from '../actions/ui';

const { Title, Text } = Typography;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 14 },
};
export const Ingresar = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(showMenu());
    }, [dispatch]);


    const history = useHistory();
    const [usuario] = useState(getUsuarioStorage());


    const onFinish = ({ agente, escritorio }) => {
        // console.log('Success:',);
        localStorage.setItem('agente', agente);
        localStorage.setItem('escritorio', escritorio);
        history.push('/escritorio');
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    // useHideMenu(false);

    if (usuario.agente && usuario.escritorio) {
        return <Redirect to="/escritorio" />
    }

    return (
        <>
            <Title level={2}> Ingresar</Title>
            <Text>
                Ingrese su nombre y numero de escritorio
            </Text>
            <Divider />
            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Nombre del Agente"
                    name="agente"
                    rules={[{ required: true, message: 'Por favor ingrese su nombre!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Escritorio"
                    name="escritorio"
                    rules={[{ required: true, message: 'Por favor ingrese su escritorio!' }]}
                >
                    <InputNumber min={1} max={99} />
                </Form.Item>



                <Form.Item {...tailLayout}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        shape="round"
                    >
                        <SaveOutlined />Ingresar
        </Button>
                </Form.Item>
            </Form>
        </>

    )
}

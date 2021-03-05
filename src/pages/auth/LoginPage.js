import React, { useEffect } from 'react';
import { Col, Form, Row, Input, Button, Typography, Divider } from 'antd';

import { useDispatch } from 'react-redux';
import { hideMenu } from '../../actions/ui';
import { GoogleOutlined } from '@ant-design/icons';
import { startGoogleLogin } from '../../actions/auth';
const { Title } = Typography;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 10, span: 16 },
};

export const LoginPage = () => {

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(hideMenu())
    }, [dispatch]);


    const onFinish = (values) => {

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const loginGoogle = () => {
        dispatch(startGoogleLogin())
    }

    return (

        <Row justify="center" style={{ marginTop: '100px' }}>
            <Title>
                Login
            </Title>
            <Divider />
            <Col span={8} >
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Por Favor ingrese su usuario!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Por favor ingrese su contraseña!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit" style={{ marginRight: 6 }}>
                            Ingresar
                    </Button>
                        <Button
                            type="ghost"
                            icon={<GoogleOutlined />}
                        >
                            Login con Google
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}

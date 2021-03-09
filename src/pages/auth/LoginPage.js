import React from 'react';
import { Col, Form, Row, Input, Button, Card } from 'antd';

import { useDispatch } from 'react-redux';
import { GoogleOutlined } from '@ant-design/icons';
import { startGoogleLogin, startLoginWithEmailAndPassword } from '../../actions/auth';
import { Link } from 'react-router-dom';


const layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
};


export const LoginPage = () => {

    const dispatch = useDispatch();


    const onFinish = ({ email, password }) => {
        dispatch(startLoginWithEmailAndPassword(email, password));

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const loginGoogle = () => {
        dispatch(startGoogleLogin())
    }

    return (

        <div className="site-card-border-less-wrapper" style={{ height: '100vh' }}  >
            <Row justify="center">
                <Col xs={{ span: 24 }} sm={{ span: 18 }} md={{ span: 12 }} lg={{ span: 10 }} >
                    <Card title="Bienvenido" bordered={false} style={{
                        textAlign: 'center', marginTop: 150, marginRight: 15,
                        borderRadius: 5
                    }} >
                        <Form
                            {...layout}
                            name="basic"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                label="Correo Electronico"
                                name="email"
                                rules={[{ required: true, type: 'email', message: 'Por Favor ingrese un Email valido!' }]}
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

                            <Form.Item   >
                                <Col sm={{ offset: 0, span: 24, push: 10 }} >
                                    <Button
                                        shape="round"
                                        htmlType="submit"
                                        style={{
                                            backgroundColor: '#3A4E7A',
                                            color: 'white'
                                        }} block >
                                        Ingresar
                                    </Button>

                                </Col>
                            </Form.Item>
                            <Form.Item >
                                <Col sm={{ span: 24, push: 10 }} lg={{ span: 24 }}  >
                                    <Button
                                        type="ghost"
                                        shape="round"
                                        onClick={loginGoogle}
                                        icon={<GoogleOutlined />}
                                        block
                                    >
                                        Login con Google
                                </Button>
                                </Col>
                            </Form.Item>
                            <Form.Item  >
                                <Col sm={{ push: 10 }}   >
                                    <Link to="/auth/register">
                                        Crea una cuenta
                                    </Link>
                                </Col>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </div >
    )
}
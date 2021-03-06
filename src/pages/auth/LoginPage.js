import React from 'react';
import { Col, Form, Row, Input, Button, Card } from 'antd';

import { useDispatch } from 'react-redux';
// import { hideMenu } from '../../actions/ui';
import { GoogleOutlined } from '@ant-design/icons';
import { startGoogleLogin, startLoginWithEmailAndPassword } from '../../actions/auth';
import { Link } from 'react-router-dom';
// const { Title } = Typography;

const layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
};
const tailLayout = {
    wrapperCol: { offset: 5, span: 16 },
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
                <Col span={10}>
                    <Card title="Login" bordered={false} style={{
                        textAlign: 'center', marginTop: 150, marginRight: 15,
                        borderRadius: 10
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

                            <Form.Item {...tailLayout}   >
                                <Col span={24}>
                                    <Button type="primary" htmlType="submit" block >
                                        Ingresar
                                    </Button>
                                </Col>

                            </Form.Item>
                            <Form.Item {...tailLayout}  >
                                <Col md={{ span: 24 }} lg={{ span: 24 }}  >
                                    <Button
                                        type="ghost"
                                        onClick={loginGoogle}
                                        icon={<GoogleOutlined />}
                                        block
                                    >
                                        Login con Google
                                </Button>
                                </Col>
                            </Form.Item>
                            <Form.Item {...tailLayout}  >
                                <Col md={{ pull: 4 }} lg={{ span: 12, push: 5 }}  >
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
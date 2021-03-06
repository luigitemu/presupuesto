import React from 'react';
import { Button, Card, Col, Form, Input, Row } from 'antd'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { startRegisterUser } from '../../actions/auth';

const layout = {
    labelCol: { span: 11 },
    wrapperCol: { span: 13 },
};
const tailLayout = {
    wrapperCol: { offset: 5, span: 16 },
};

export const RegisterPage = () => {
    const dispatch = useDispatch();

    const onFinish = ({ email, password, name }) => {

        dispatch(startRegisterUser(email, password, name))
    };

    const onFinishFailed = (errorInfo) => {
        // console.log('Failed:', errorInfo);
    };
    return (

        <div className="site-card-border-less-wrapper" style={{ height: '100vh' }}  >
            <Row justify="center">
                <Col span={10}>
                    <Card
                        title="Registrarse"
                        bordered={false}
                        style={{
                            textAlign: 'center',
                            marginTop: 150,
                            marginRight: 15,
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
                                label="Nombre"
                                name="name"
                                rules={[{ required: true, message: 'Por Favor ingrese su nombre!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Correo Electronico"
                                name="email"
                                rules={[{ required: true, type: 'email', message: 'Por Favor ingrese un Email valido!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Contraseña"
                                name="password"
                                rules={[{
                                    required: true,
                                    message: 'Por favor ingrese una contraseña mayor a 6 caracteres!',
                                    min: 6
                                }]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item
                                label="Confirmar Contraseña"
                                name="password2"
                                rules={[{
                                    required: true,
                                    message: 'Por favor confirme su contraseña!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject('Las contraseñas no coinciden')
                                    }
                                })
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>


                            <Form.Item {...tailLayout}   >
                                <Col span={24}>
                                    <Button type="primary" htmlType="submit" block >
                                        Registrarse
                                    </Button>
                                </Col>

                            </Form.Item>
                            <Form.Item {...tailLayout}  >
                                <Col md={{ pul: 4 }} lg={{ span: 16, push: 4 }} >
                                    <Link to="/auth/login">
                                        Ya tiene una cuenta?
                                    </Link>
                                </Col>
                            </Form.Item>

                        </Form>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

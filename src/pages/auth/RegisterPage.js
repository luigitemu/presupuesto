import React from 'react';
import { Button, Card, Col, Form, Input, Row } from 'antd'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { startRegisterUser } from '../../actions/auth';

const layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 13 },
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
                <Col xs={{ span: 24 }} sm={{ span: 18 }} md={{ span: 16 }} lg={{ span: 10 }}>
                    <Card
                        title="Registrarse"
                        bordered={false}
                        style={{
                            textAlign: 'center',
                            marginTop: 100,
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


                            <Form.Item  >
                                <Col sm={{ span: 24, push: 11 }} >
                                    <Button
                                        shape="round"
                                        htmlType="submit"
                                        style={{
                                            backgroundColor: '#3A4E7A',
                                            color: 'white'
                                        }}
                                        block >
                                        Registrarse
                                    </Button>
                                </Col>

                            </Form.Item>
                            <Form.Item  >
                                <Col sm={{ span: 24, push: 11 }}  >
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

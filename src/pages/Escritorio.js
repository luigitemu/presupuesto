import React, { useState } from 'react';
import { Button, Col, Divider, Row, Typography } from 'antd';
import { ArrowRightOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { getUsuarioStorage } from '../helper/getUsuarioStorage';
import { Redirect, useHistory } from 'react-router-dom';


const { Title, Text } = Typography;
export const Escritorio = () => {
    const history = useHistory();

    const salir = () => {
        localStorage.clear();
        history.push('/ingresar');
    }
    const siguienteTicket = () => {
        console.log('Siguiente Ticket');
    }
    const [usuario] = useState(getUsuarioStorage());

    if (!usuario.agente && !usuario.escritorio) {
        return <Redirect to="/ingresar" />
    }

    return (
        <>
            <Row>
                <Col span={20}>
                    <Title level={2}>{usuario.agente}</Title>
                    <Text>Usted esta trabajando en el escritorio: </Text>
                    <Text type="success"> {usuario.escritorio}</Text>
                </Col>

                <Col span={4} align="right" >
                    <Button
                        type="danger"
                        shape="round"
                        onClick={salir}
                    >
                        <CloseCircleOutlined />
                        Salir
                    </Button>
                </Col>
            </Row>

            <Divider />

            <Row>
                <Col>
                    <Text>Esta Atendiendo el ticket numero: </Text>
                    <Text
                        style={{ fontSize: 30 }}
                        type="danger"
                    >
                        55
                    </Text>
                </Col>
            </Row>

            <Row>
                <Col offset={18} span={6} align="right">
                    <Button
                        type="primary"
                        shape="round"
                        onClick={siguienteTicket}
                    >
                        <ArrowRightOutlined />
                        Siguiente
                    </Button>
                </Col>
            </Row>

        </>
    )
}

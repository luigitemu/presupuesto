import React, { useEffect } from 'react';
import { Button, Col, Row, Typography } from 'antd';
import { DownloadOutlined } from '@ant-design/icons'
// import { useHideMenu } from '../hooks/useHideMenu';
import { useDispatch } from 'react-redux';
import { hideMenu } from '../actions/ui';

const { Title, Text } = Typography;
export const CrearTicket = () => {

    // useHideMenu(true);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(hideMenu());
    }, [dispatch]);

    const nuevoTicket = () => {
        console.log('Nuevo Ticket');
    }
    return (
        <>
            <Row>
                <Col span={14} offset={6} align="center">
                    <Title level={3}>
                        Presione el boton para  un nuevo ticket
                    </Title>

                    <Button
                        type="primary"
                        shape="round"
                        icon={<DownloadOutlined />}
                        size="large"
                        onClick={nuevoTicket}
                    >
                        Nuevo Ticket
                    </Button>
                </Col>
            </Row>
            <Row style={{ marginTop: '90px' }}>
                <Col
                    span={14}
                    offset={6}
                    align="center"
                >
                    <Text level={2}>
                        Su numero:
                    </Text>
                    <br />
                    <Text type="success" style={{ fontSize: '55px   ' }}>
                        5
                    </Text>
                </Col>
            </Row>
        </>
    )
}

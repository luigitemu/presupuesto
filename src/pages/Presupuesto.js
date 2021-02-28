import { PlusOutlined } from '@ant-design/icons';
import { Col, Divider, Row, Typography, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startAddingItem } from '../actions/item';
import { showMenu } from '../actions/ui';
import { EditableTable } from '../components/table/EditableTable';

const { Title, Text } = Typography;


export const Presupuesto = () => {

    const { total } = useSelector(state => state.item);
    const [presupuestoInicial] = useState(50000)
    const [presupuesto, setPresupuesto] = useState(total);

    const dispatch = useDispatch();

    // Efecto
    useEffect(() => {
        setPresupuesto(total);
    }, [total])

    useEffect(() => {
        dispatch(showMenu());
    }, [dispatch]);

    // Funcionalidad 

    const handleAdd = () => {
        dispatch(startAddingItem())
    }

    return (
        <>
            <Row>
                <Col span={18}>
                    <Title>
                        Presupuesto
                    </Title>
                    <Text > Presupuesto Estimado: </Text>
                    <Text type="success"  >L{presupuestoInicial}  </Text>
                    <br />
                    <Text > Presupuesto Actual: </Text>
                    <Text type={(presupuestoInicial > presupuesto) ? "success" : "danger"} >L{presupuesto}</Text>
                </Col>
                <Col span={4} offset={2} >
                    <Button
                        shape="circle"
                        type="primary"
                        icon={<PlusOutlined />}
                        style={{ marginTop: 20, width: 50, height: 50 }}
                        onClick={handleAdd}
                    >

                    </Button>
                </Col>
                <Divider />
            </Row>
            <EditableTable />

        </>
    )
}

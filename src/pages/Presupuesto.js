import { PlusOutlined } from '@ant-design/icons';
import { Col, Divider, Row, Typography, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { startAddingItem } from '../actions/item';
import { startSetActiveProject } from '../actions/proyecto';
// import { startAddingNewItem } from '../actions/proyecto';
import { showMenu } from '../actions/ui';
import { EditableTable } from '../components/table/EditableTable';

const { Title, Text } = Typography;


export const Presupuesto = () => {

    const { total } = useSelector(state => state.presupuesto);
    const { activeProject } = useSelector(state => state.proyecto);
    const { id } = useParams();
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

    useEffect(() => {
        dispatch(startSetActiveProject(id));
    }, [dispatch, id]);
    // Funcionalidad 

    const handleAdd = () => {
        dispatch(startAddingItem(id));
    }

    return (
        <>
            <Row>
                <Col span={18}>
                    <Title>
                        Presupuesto( {activeProject.title})
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

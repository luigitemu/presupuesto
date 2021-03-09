import { PlusOutlined } from '@ant-design/icons';
import { Col, Divider, Row, Typography, Button, Progress } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { startAddingItem } from '../actions/item';
import { startSetActiveProject } from '../actions/proyecto';
import { hideMenu } from '../actions/ui';
import { EditableTable } from '../components/table/EditableTable';

const { Title, Text } = Typography;


export const Presupuesto = () => {

    const { total } = useSelector(state => state.presupuesto);
    const { activeProject } = useSelector(state => state.proyecto);
    const { id } = useParams();
    const [presupuestoInicial, setPresupuestoInicial] = useState(activeProject.presupuestoInicial)
    const [presupuesto, setPresupuesto] = useState(total);
    const dispatch = useDispatch();

    const [percent, setPercent] = useState(0);

    // Efecto
    useEffect(() => {
        setPresupuesto(total);
    }, [total]);

    useEffect(() => {
        setPresupuestoInicial(activeProject.presupuestoInicial)
    }, [activeProject]);

    useEffect(() => {
        dispatch(hideMenu());
    }, [dispatch]);

    useEffect(() => {
        dispatch(startSetActiveProject(id));
    }, [dispatch, id]);

    useEffect(() => {
        // console.log(activeProject.presupuestoInicial);
        const percentCalculated = (total * 100) / presupuestoInicial
        setPercent(percentCalculated.toFixed(2));

    }, [activeProject, total, presupuestoInicial]);
    // Funcionalidad 

    const handleAdd = () => {
        dispatch(startAddingItem(id));
    }

    return (
        <>
            <Row>
                <Col
                    sm={{ span: 18 }}
                    lg={{ span: 18 }}

                >
                    <Title>
                        Presupuesto( {activeProject.title})
                    </Title>
                    <Text > Presupuesto Estimado: </Text>
                    <Text type="success"  >L{presupuestoInicial}  </Text>
                    <br />
                    <Text > Presupuesto Actual: </Text>
                    <Text type={(presupuestoInicial > presupuesto) ? "success" : "danger"} >L{presupuesto}</Text>
                </Col>
                <Col sm={{ span: 5 }} lg={{ span: 4, offset: 2 }}  >
                    <Button
                        shape="round"
                        type="primary"
                        icon={<PlusOutlined />}
                        style={{ marginTop: 30 }}
                        onClick={handleAdd}
                    >
                        Agregar
                    </Button>
                </Col>
                <Divider />
            </Row>
            <Progress
                percent={percent}
                strokeColor="#091D36"
                showInfo={true}
            />
            <EditableTable />

        </>
    )
}

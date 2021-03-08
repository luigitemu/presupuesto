import { DeleteFilled, DollarCircleFilled, EditFilled, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Divider, List, Popconfirm, Popover, Row, Skeleton, Statistic, Typography } from 'antd'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { cleanItems, startLoadingItems } from '../actions/item';
import { setActiveProject, startDeleteProject } from '../actions/proyecto';
import { openModal, openModalEdit, showMenu } from '../actions/ui';
import { ModalAdd } from '../components/modal/ModalAdd';
import { ModalEdit } from '../components/modal/ModalEdit';

const { Title } = Typography;

export const Proyecto = () => {

    const dispatch = useDispatch();
    const { projects } = useSelector(state => state.proyecto)
    const { loadingTable } = useSelector(state => state.ui)
    const history = useHistory();
    useEffect(() => {
        dispatch(showMenu())
    }, [dispatch]);

    useEffect(() => {
        dispatch(cleanItems());
    }, [dispatch])

    // Manejo de Botones 
    const showModal = () => {
        dispatch(openModal())
    }
    const handleEdit = (id, project) => {
        dispatch(setActiveProject(id, project));
        dispatch(openModalEdit());

    }
    const handleDelete = (id) => {
        dispatch(startDeleteProject(id));
    }
    const handleBudget = (id, project) => {
        dispatch(startLoadingItems(id));
        dispatch(setActiveProject(id, project));
        history.push(`/presupuesto/${id}`);
    }

    return (
        <>
            <Row>
                <Col span={20}>
                    <Title>
                        Proyectos
                    </Title>

                </Col>
                <Col span={2} offset={1} >
                    <Button
                        shape="circle"
                        type="primary"
                        onClick={showModal}
                        icon={<PlusOutlined />}
                        style={{ marginTop: 20, width: 60, height: 60 }}
                    // onClick={handleAdd}
                    >


                    </Button>
                </Col>
                <Divider />
                <ModalAdd />
            </Row>

            <List
                className="demo-loadmore-list"
                loading={loadingTable}
                itemLayout="horizontal"
                dataSource={projects}
                renderItem={item => (
                    <List.Item
                        actions={[
                            <Popover content="Presupuesto">
                                <Button
                                    shape="circle"
                                    onClick={() => handleBudget(item.id, item)}
                                    icon={<DollarCircleFilled style={{ color: 'white' }} />}
                                    style={{ backgroundColor: '#1BAE6C' }}
                                />
                            </Popover>,
                            <Popover content="Editar">
                                <Button
                                    shape="circle"
                                    onClick={() => handleEdit(item.id, item)}
                                    icon={<EditFilled />}
                                    style={{ backgroundColor: '#FCD200' }}
                                />
                            </Popover>,
                            <Popover content="Eliminar">
                                <Popconfirm
                                    title="Esta seguro que desea Eliminar el proyecto?"
                                    onConfirm={() => handleDelete(item.id)}
                                >

                                    <Button
                                        shape="circle"
                                        type="danger"
                                        icon={<DeleteFilled />}
                                    />
                                </Popconfirm>
                            </Popover>,
                        ]}

                    >
                        <Skeleton
                            title={false}
                            loading={loadingTable}
                            active
                        >
                            <List.Item.Meta
                                title={item.title}
                                description={
                                    <Statistic
                                        value={item.presupuestoInicial}
                                        valueStyle={{ color: '#3f8600' }}
                                        suffix="L"
                                    />
                                }
                            />

                        </Skeleton>
                    </List.Item>
                )
                }
            />
            <ModalEdit />


        </>
    )
}

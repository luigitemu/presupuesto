import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Col, Divider, Row, Typography, Table, Button, Popconfirm } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startAddingItem } from '../actions/item';
import { showMenu } from '../actions/ui';
import { EditableCell } from '../components/EditableCell';
import { EditableRow } from '../components/EditableRow';


// import { data } from '../data/data';
const { Title, Text } = Typography;

// const { Column } = Table;




export const Presupuesto = () => {

    const { items, total } = useSelector(state => state.item);
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

    const handleDelete = (id) => {
        console.log(id);
    }
    // Elementos de la tabla
    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        }
    }
    const initColumns = [
        {
            title: 'item',
            dataIndex: 'item',
            width: '30%',
            numeric: false,
            editable: true,
        },
        {
            title: 'Cantidad',
            dataIndex: 'quantity',
            numeric: true,
            editable: true,
        },
        {
            title: 'Precio x Unidad',
            dataIndex: 'unityPrice',
            numeric: true,
            editable: true,
        },
        {
            title: 'total',
            render: (_, record) => (
                <>
                    {record.quantity * record.unityPrice}
                </>
            )
        }
        ,
        {
            title: 'Action',
            dataIndex: 'Action',
            render: (_, record) =>
                <Popconfirm title="Seguro que desea Eliminar?" onConfirm={() => handleDelete(record.key)}>
                    <Button
                        shape="circle"
                        type="danger"
                        icon={<DeleteOutlined />}
                    ></Button>
                </Popconfirm>
        },
    ];
    const handleSave = (row) => {
        console.log(row);
    }

    const columns = initColumns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                numeric: col.numeric,
                handleSave: handleSave,
            })
        }
    });


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
                    <Text type={(presupuestoInicial > Presupuesto) ? "success" : "danger"} >L{presupuesto}</Text>
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
            <Table
                dataSource={items}
                rowClassName={() => 'editable-row'}
                components={components}
                columns={columns}
                scroll={{ y: 400 }}
            >

            </Table>

        </>
    )
}

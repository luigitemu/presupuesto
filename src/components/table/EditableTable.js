import React, { useEffect } from 'react'
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { EditableCell } from './EditableCell';
import { EditableRow } from './EditableRow';
import { startEditing, setTotal, startDeleting } from '../../actions/item';

export const EditableTable = () => {

    const { items } = useSelector(state => state.item);
    const dispatch = useDispatch();

    useEffect(() => {

        let newTotal = 0;
        items.forEach(item => {
            newTotal += (item.quantity * item.unityPrice)
        });
        dispatch(setTotal(newTotal));

    }, [items, dispatch])

    const handleDelete = (id) => {
        dispatch(startDeleting(id));
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
            title: 'Item',
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
        dispatch(startEditing(row));
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
        <Table
            dataSource={items}
            rowClassName={() => 'editable-row'}
            components={components}
            columns={columns}
            scroll={{ y: 370 }}
        >

        </Table>
    )
}

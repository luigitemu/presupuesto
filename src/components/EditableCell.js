import { Form, Input, InputNumber } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { EditableContext } from '../context/EditableContext';

export const EditableCell = ({
    title,
    editable,
    children,
    numeric,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };
    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            (numeric)
                ? (
                    <Form.Item
                        style={{
                            margin: 0,
                        }}
                        name={dataIndex}
                        rules={[
                            {
                                required: true,
                                type: 'number',
                                message: `${title} debe ser un numero.`,
                            },
                        ]}
                    >
                        <InputNumber ref={inputRef} onPressEnter={save} onBlur={save} />
                    </Form.Item>
                ) : (
                    <Form.Item
                        style={{
                            margin: 0,
                        }}
                        name={dataIndex}
                        rules={[
                            {
                                required: true,
                                type: 'number',
                                message: `${title} es obligatorio.`,
                            },
                        ]}
                    >
                        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
                    </Form.Item>)
        ) : (
                <div
                    className="editable-cell-value-wrap"
                    style={{
                        paddingRight: 24,
                    }}
                    onClick={toggleEdit}
                >
                    {children}
                </div>
            );
    }

    return <td {...restProps}>{childNode}</td>;
};
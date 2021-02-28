import React, { useEffect } from 'react';
import { Layout, Menu } from 'antd';
import {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    BankOutlined,
} from '@ant-design/icons';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import { Ingresar } from './Ingresar';
import { Cola } from './Cola';
import { CrearTicket } from './CrearTicket';
import { Escritorio } from './Escritorio';
import { useDispatch, useSelector } from 'react-redux';
import { Presupuesto } from './Presupuesto';
import { startLoadingItems } from '../actions/item';
// import { hideMenu, showMenu } from '../actions/ui';
// import { UiContext } from '../context/UiContext';

const { Sider, Content } = Layout;
const { Item } = Menu;

export const RouterPage = () => {

    // const { ocultarMenu } = useContext(UiContext);

    const { menuOpen } = useSelector(state => state.ui);
    const dispatch = useDispatch();

    // Efectos 
    useEffect(() => {
        dispatch(startLoadingItems())
    }, [dispatch])

    return (
        <Router Router >
            <Layout style={{ height: '100vh' }}>
                <Sider
                    collapsedWidth="0"
                    breakpoint="md"
                    hidden={menuOpen}
                >
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} >
                        <Item key="1" icon={<UserOutlined />}>
                            <Link to="/ingresar">
                                Ingresar
                            </Link>
                        </Item>
                        <Item key="2" icon={<VideoCameraOutlined />}>
                            <Link to="/cola">
                                Cola
                            </Link>
                        </Item>
                        <Item key="3" icon={<UploadOutlined />}>
                            <Link to="/crear">
                                Crear Ticket
                            </Link>
                        </Item>
                        <Item key="4" icon={<BankOutlined />}>
                            <Link to="/presupuesto">
                                Presupuesto
                            </Link>
                        </Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">

                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            overflow: 'auto'
                        }}
                    >
                        <Switch>
                            <Route path="/ingresar" component={Ingresar} />
                            <Route path="/cola" component={Cola} />
                            <Route path="/crear" component={CrearTicket} />
                            <Route path="/presupuesto" component={Presupuesto} />

                            <Route path="/escritorio" component={Escritorio} />

                            <Redirect to="/ingresar" />
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        </Router >
    )
}

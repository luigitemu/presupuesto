import React, { useEffect } from 'react';
import { Layout, Menu } from 'antd';
import {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    ProfileOutlined,
} from '@ant-design/icons';
import {
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
import { Proyecto } from './Proyecto';
import { startLoadingProjects } from '../actions/proyecto';
// import { LoginPage } from './auth/LoginPage';
// import { hideMenu, showMenu } from '../actions/ui';
// import { UiContext } from '../context/UiContext';

const { Sider, Content } = Layout;
const { Item } = Menu;

export const RouterPage = () => {


    const { menuOpen } = useSelector(state => state.ui);
    const dispatch = useDispatch();

    // Efectos 
    useEffect(() => {
        dispatch(startLoadingProjects())
    }, [dispatch])


    return (



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
                    <Item key="5" icon={<ProfileOutlined />}>
                        <Link to="/proyecto">
                            Proyectos
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
                        <Route path="/presupuesto/:id" component={Presupuesto} />
                        <Route path="/proyecto" component={Proyecto} />
                        {/* <Route path="/login" component={LoginPage} />    */}
                        <Route path="/proyecto" component={Proyecto} />
                        <Route path="/escritorio" component={Escritorio} />
                        <Redirect to="/auth/login" />
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    )
}

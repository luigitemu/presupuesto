import React from 'react';
import { Button, Layout, Menu, PageHeader } from 'antd';
import {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    ProfileOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import {
    Switch,
    Route,
    Link,
    Redirect,
    useHistory
} from "react-router-dom";
import { Ingresar } from '../pages/Ingresar';
import { Cola } from '../pages/Cola';
import { CrearTicket } from '../pages/CrearTicket';
import { Escritorio } from '../pages/Escritorio';
import { useDispatch, useSelector } from 'react-redux';
import { Presupuesto } from '../pages/Presupuesto';
import { Proyecto } from '../pages/Proyecto';
import { Header } from 'antd/lib/layout/layout';
import { startLogout } from '../actions/auth';

const { Sider, Content } = Layout;
const { Item } = Menu;

export const RouterPage = () => {


    const { menuOpen } = useSelector(state => state.ui);
    const { name } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogOut = () => {
        dispatch(startLogout());
    }
    const regresar = () => {
        history.goBack();
    }
    return (



        <Layout style={{ height: '100vh' }}>
            <Sider
                collapsedWidth="0"
                breakpoint="md"
                hidden={menuOpen}

            >
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                // selectedKeys={['1']}
                >
                    <Item key="1" icon={<ProfileOutlined />}>
                        <Link to="/proyecto">
                            Proyectos
                            </Link>
                    </Item>
                    <Item
                        key="2"
                        icon={<UserOutlined />}>
                        <Link to="/ingresar">
                            Ingresar
                            </Link>
                    </Item>
                    <Item key="3" icon={<VideoCameraOutlined />}>
                        <Link to="/cola">
                            Cola
                            </Link>
                    </Item>
                    <Item key="4" icon={<UploadOutlined />}>
                        <Link to="/crear">
                            Crear Ticket
                            </Link>
                    </Item>

                </Menu>
            </Sider>
            <Layout className="site-layout">
                {/* Header */}
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    <PageHeader
                        title={name}
                        className="site-page-header"
                        onBack={() => regresar()}
                        extra={[
                            <Button
                                key="1"
                                type="danger"
                                shape="round"

                                style={{
                                    backgroundColor: '#CA2637',
                                    color: 'white',
                                }}
                                onClick={handleLogOut}
                                icon={<LogoutOutlined />}

                            > Salir</Button>
                        ]}

                    />
                </Header>
                {/* Fin Header */}

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
                        <Route exact path="/ingresar" component={Ingresar} />
                        <Route exact path="/cola" component={Cola} />
                        <Route exact path="/crear" component={CrearTicket} />
                        <Route exact path="/presupuesto/:id" component={Presupuesto} />
                        <Route exact path="/proyecto" component={Proyecto} />
                        <Route exact path="/escritorio" component={Escritorio} />
                        <Redirect to="/proyecto" />
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    )
}

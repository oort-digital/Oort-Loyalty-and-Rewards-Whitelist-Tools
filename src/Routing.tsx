/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.less";
import { Layout } from "antd";
import { RootStore } from "./stores/root-store";
import { observer } from "mobx-react";
import { PATH_NAME } from "./utils";
import SideMenu from "./components/side-menu";
import NavHeader from "./components/header";
import FirstPage from "./pages/firstPage";
import routes from "./router-config";
interface IRoutingState {
  isCollapsed: boolean;
}

interface IRoutingProps {
  rootStore: RootStore;
}

@observer
class Routing extends React.Component<IRoutingProps, IRoutingState> {
  static getDefaultPath = () => {
    const pathname = window.location.pathname;
    if (!pathname || pathname === "/") {
      return PATH_NAME.HOME_PAGE;
    }
    return pathname;
  };

  constructor(props: any) {
    super(props);
    this.state = {
      isCollapsed: false,
    };
    this.collapseSider = this.collapseSider.bind(this);
  }
  collapseSider = () => {
    this.setState({
      isCollapsed: !this.state.isCollapsed,
    });
  };
  render() {
    const { rootStore } = this.props;
    const { Content, Sider } = Layout;
    const { isCollapsed } = this.state;
    const { multiversProvider } = rootStore;
    return (
      <Router>
        <Layout style={{ height: "100vh" }}>
          <Sider collapsible trigger={null} collapsed={isCollapsed}>
            <SideMenu
              collapseSider={this.collapseSider}
              isCollapse={isCollapsed}
            />
          </Sider>
          <Layout className="content-container">
            <NavHeader provider={multiversProvider} />
            <Content>
              <Switch>
                {routes.map((route, index) => {
                  if (route.exact) {
                    return (
                      <Route
                        key={index}
                        exact
                        path={route.path}
                        render={() => (
                          <FirstPage
                            web3Store={rootStore.web3Store}
                            multiverxProvider={rootStore.multiversProvider}
                            gen3PhaseProvider={rootStore.gen3PhaseProvider}
                          />
                        )}
                      />
                    );
                  } else {
                    return (
                      <Route
                        key={index}
                        path={route.path}
                        render={() => (
                          <route.component
                            multiverxProvider={rootStore.multiversProvider}
                            web3Store={rootStore.web3Store}
                            gen3PhaseProvider={rootStore.gen3PhaseProvider}
                          />
                        )}
                      />
                    );
                  }
                })}
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default Routing;

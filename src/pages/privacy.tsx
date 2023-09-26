import React from "react";
import {observer} from "mobx-react";
import { Tabs} from "antd";
import PrivacyMessage from "../components/privacy-message";

@observer
class Privacy extends React.Component{
  render(){
    const {TabPane} = Tabs;
    return<div className="privacy-container">
        <Tabs
              defaultActiveKey="message"
              className="tab-container"
              tabBarGutter={49}
            >
              <TabPane tab="Message" key="message">
                <PrivacyMessage/>
              </TabPane>
              <TabPane tab="Identity" key="identity"></TabPane>
              <TabPane tab="Group" key="group"></TabPane>
            </Tabs>
    </div>
  }
}
export default Privacy;
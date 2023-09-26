import React,{ Component }  from "react";
import { Empty } from "antd";
import nodata from "../images/nodata.png"

class EmptyContent extends Component {
  render() {
    return <Empty
    image={nodata}
    imageStyle={{
      height: 60,
      marginTop:"100px"
    }}
    description={
      <span className="dark-text">No data</span>
    }
  >
  </Empty>
  }
}

export default EmptyContent;

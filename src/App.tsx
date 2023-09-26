import React from 'react';
import './App.less';
import './styles/styles.less';
import Routing from './Routing';
import { RootStore } from './stores/root-store';


class App extends React.Component<{ rootStore: RootStore }, {}> {
  
  render = () => (<Routing rootStore={this.props.rootStore}/>)
    
}

export default App;
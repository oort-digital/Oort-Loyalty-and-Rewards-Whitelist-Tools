import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { RootStore } from './stores/root-store';

const rootStore: RootStore = new RootStore()
window.addEventListener("load", function () {
    let setRem = function () {
        // 移动端屏幕宽度
        let winWidth = document.documentElement.clientWidth;

        // 比率
        let rate = winWidth / 40;

        // 设置html元素的字体大小
        document.documentElement.style.fontSize = rate + "px"

    };
    setRem();
    window.onresize = function () {
        setRem();
    }
}, false)
ReactDOM.render(
  // <React.StrictMode> because of https://github.com/ant-design/ant-design/issues/22493
    <App rootStore={rootStore}/>,
  // </React.StrictMode>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


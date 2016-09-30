'use strict';

import React, {
  Component,
} from 'react';

import {
  AppRegistry,
  StyleSheet,
  Navigator,
  View,
  Text,
  Platform,
  TouchableOpacity,
  StatusBar,
  BackAndroid,
  NativeModules,
  ToastAndroid

} from 'react-native';

import Home from './page/home';
import ArticleDetail from './page/articledetail';
import Setting from './page/setting';
import Test from './page/test';


import styles from './style/appstyle';
import Common from './common/commonhelper';


import Icon from 'react-native-vector-icons/FontAwesome';

var NativeCommonTools = NativeModules.CommonTools;
	var firstClick = 0;

export default class App extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      hideNavBar: false
    };
    this._renderScene = this._renderScene.bind(this);

    this.RightButton = this.RightButton.bind(this);
  }


  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => this._goback());
  }

  _goback() {
    var navigator = this.navigator;
    // const routers = navigator.getCurrentRoutes();
    // // 当前页面不为root页面时的处理  
    // if (routers.length > 1) {
    //   const top = routers[routers.length - 1];
    //   if (top.ignoreBack || top.component.ignoreBack) {
    //     // 路由或组件上决定这个界面忽略back键  
    //     return true;
    //   }
    //   // const handleBack = top.handleBack || top.component.handleBack;
    //   // if (handleBack) {
    //   //   // 路由或组件上决定这个界面自行处理back键  
    //   //   return handleBack();
    //   // }  // 默认行为： 退出当前界面。  
    //   navigator.pop();
    //   return true;
    // }

    if (navigator && navigator.getCurrentRoutes().length > 1) {
      navigator.pop();
      return true;
    } else {
      var timestamp = (new Date()).valueOf();
      if (timestamp - firstClick > 2000) {
        firstClick = timestamp;
        ToastAndroid.show('再按一次退出', ToastAndroid.SHORT);
        return true;
      } else {
        return false;
      }
    }
  }




  _renderScene(route, nav) {
    let Component = route.component;
    return <Component {...route.params} navigator={nav}  />
  }

  _gosetting(navigator) {
    navigator.push({
      name: 'setting',
      component: Setting,
      params: {
        title: '设置'
      }
    })

  }

  // 渲染DOM
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#512DA8"
          />
        <Navigator
        ref={nav => { this.navigator = nav; }}
          initialRoute={{ name: 'home', component: Home, params: { title: 'IT米粉' } }}
          renderScene={this._renderScene}
          sceneStyle={{ backgroundColor: '#fff' }}
          navigationBar={this.navBar() }/>
      </View>
    );

  }

  // Nav使用
  navBar() {
    if (!this.state.hideNavBar) {
      return <Navigator.NavigationBar
        routeMapper={{
          LeftButton: this.LeftButton,
          RightButton: this.RightButton,
          Title: this.Title
        }}
        style={styles.navBar} />
    } else {
      return <Text style={{ height: 0, position: 'absolute', top: 0 }} />;
    }
  }

  LeftButton(route, navigator, index, navState) {
    if (index > 0) {
      return (
        <TouchableOpacity
          onPress={() => navigator.pop() }
          style={[styles.navBarLeftButton]}>

          <Icon name="arrow-left" style={styles.navBarLeftButtontxt}>
          </Icon>
        </TouchableOpacity>

      );
    }
    else {
      return null;
    }

  }
  RightButton(route, navigator, index, navState) {

    return (
      <TouchableOpacity
        onPress={() => this._gosetting(navigator) }
        style={[styles.navBarLeftButton]}>

        <Icon name="cog" style={styles.navBarRightButtontxt}>
        </Icon>
      </TouchableOpacity>

    );
  }
  Title(route, navigator, index, navState) {
    return (
      <View style={styles.navBarTitleView}>
        <Text style={styles.navBarTitleText}>
          {route.params.title}
        </Text>
      </View>
    )

  }


}



AppRegistry.registerComponent('itmifen', () => App);

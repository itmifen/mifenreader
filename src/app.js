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
    
} from 'react-native';

import Home from './page/home';
import ArticleDetail from './page/articledetail';
import Setting from './page/setting';


import styles from './style/appstyle';
import Common from './common/commonhelper';


import Icon from 'react-native-vector-icons/FontAwesome';


export default class App extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        hideNavBar: false
      };
      this._renderScene = this._renderScene.bind(this);

      this.RightButton = this.RightButton.bind(this);
  }



  _renderScene(route,nav) {
     let Component = route.component;
     return <Component {...route.params} navigator={nav}  />
  }

  _gosetting(navigator)
  {
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
    return(
    <View style={{flex:1}}>
      <StatusBar
          barStyle="light-content"
          backgroundColor="#512DA8"
    />
        <Navigator
          initialRoute={{ name: 'home', component: Home,params:{title:'IT米粉'} }}
          renderScene={this._renderScene}
          sceneStyle={{backgroundColor:'#fff'}}
          navigationBar={this.navBar()}/>
          </View>
      );

  }

  // Nav使用
  navBar() {
    if(!this.state.hideNavBar) {
        return <Navigator.NavigationBar
                  routeMapper={{
                      LeftButton: this.LeftButton,
                      RightButton: this.RightButton,
                      Title: this.Title
                  }}
                  style={styles.navBar} />
    } else {
        return <Text style={{height:0,position:'absolute',top:0}} />;
    }
  }

  LeftButton(route, navigator, index, navState) {
    if(index>0)
    {
      return (
        <TouchableOpacity
          onPress={() => navigator.pop()}
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
        onPress={() => this._gosetting(navigator)}
        style={[styles.navBarLeftButton]}>

     <Icon name="cog" style={styles.navBarRightButtontxt}>
     </Icon>
      </TouchableOpacity>

    );
  }
  Title(route, navigator, index, navState) {
    return(
      <View style={styles.navBarTitleView}>
       <Text style={styles.navBarTitleText}>
         {route.params.title}
       </Text>
       </View>
    )

  }


}



AppRegistry.registerComponent('itmifen', () => App);

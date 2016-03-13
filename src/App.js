
/**
 * React Native Webpack Starter Kit
 * https://github.com/jhabdas/react-native-webpack-starter-kit
 */
import React, {Component} from 'react-native';

const {
  Navigator,
  StyleSheet,
  View
} = React;

import Home from './components/screens/home/Home';
import AddItem from './components/screens/items/AddItem';
import ConfirmAddItem from './components/screens/items/ConfirmAddItem';
import commonStyles from './components/styles';
import {
  ADD_ITEM
} from './constants/screens';

const styles = StyleSheet.create({
  navContainer: {
    flex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    backgroundColor: '#00000000'
  }
});

class App extends Component {

  renderScene(route, nav) {
    var ScreenComponent = null;
    switch (route.id) {
      case 'HomeScreen':
        ScreenComponent = Home;
        break;
      case 'AddItemScreen':
        ScreenComponent = AddItem;
        break;
      case 'ConfirmAddItemScreen':
      ScreenComponent =ConfirmAddItem;
        break;
    }
    if (ScreenComponent) {
      return <ScreenComponent navigator={nav} data={route.data}/>;
    }
  }

  render() {
    return (
        <View style={commonStyles.container}>
          <Navigator style={styles.navContainer}
                     initialRoute={{ id: ADD_ITEM }}
                     renderScene={this.renderScene}
          />
        </View>

    );
  }

}

export default App;

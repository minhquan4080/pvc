
/**
 * React Native Webpack Starter Kit
 * https://github.com/jhabdas/react-native-webpack-starter-kit
 */
import React, {Component} from 'react-native';
import Orientation from 'react-native-orientation';

const {
  Navigator,
  StyleSheet,
  View,
  StatusBarIOS
} = React;

import Home from './components/screens/home/Home';
import AddItem from './components/screens/items/AddItem';
import SellItem from './components/screens/items/SellItem';
import ConfirmAddItem from './components/screens/items/ConfirmAddItem';
import ConfirmSellItem from './components/screens/items/ConfirmSellItem';
import CheckQuantity from './components/screens/items/CheckQuantity';
import Sum from './components/screens/sum/Sum';
import commonStyles from './components/styles';
import {
  HOME
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
  componentWillMount() {
    Orientation.lockToLandscape();
    StatusBarIOS.setHidden(true);
  }

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
        ScreenComponent = ConfirmAddItem;
        break;
      case 'SellItemScreen':
        ScreenComponent = SellItem;
        break;
      case 'ConfirmSellItemScreen':
        ScreenComponent = ConfirmSellItem;
        break;
      case 'CheckQuantityScreen':
        ScreenComponent = CheckQuantity;
        break;
      case 'SumScreen':
        ScreenComponent = Sum;
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
                     initialRoute={{ id: HOME }}
                     renderScene={this.renderScene}
          />
        </View>

    );
  }

}

export default App;

import React, {Component} from 'react-native';

const {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity
} = React;

import Store from 'react-native-store';
import bg from '../../img/background.jpg';
import arrow from '../../img/arrow64.png';
import smallArrow from '../../img/right-arrow.png';
import { H1 } from './../../common/Heading';
import Dimensions from 'Dimensions';
import {
  ADD_ITEM,
  SELL_ITEM
} from './../../../constants/screens';

const DB = {
  'insert': Store.model('insert'),
  'sellitem': Store.model('sellitem'),
  'items': Store.model('items')
};
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  heading: {
    flex: 1,
    position: 'absolute',
    top: 10,
    left: -70,
    width: Dimensions.get('window').width / 1.2,
    alignItems: 'center'
  },
  headingTitle: {
    color: '#FB8C00',
    textAlign: 'center',
    fontSize: 28
  },
  checkWeight: {
    flex: 1,
    position: 'absolute',
    top: 120,
    left: 50,
    width: 120,
    height: 50,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#81C784',
    backgroundColor: '#81C784',
    borderRadius: 10,
    padding: 8
  },
  checkWeightTitle: {
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  circleButton: {
    flex: 1,
    position: 'absolute',
    top: 30,
    right: 130,
    width: 100,
    height: 100,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FB8C00',
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    paddingTop: 35,
    paddingBottom: 40
  },
  btnExit: {
    flex: 1,
    position: 'absolute',
    right: 5,
    top: 10
  },
  btnExitText: {
    top: -40,
    left: 10,
    color: '#FFFFFF'
  },
  smallArrow1: {
    flex: 1,
    position: 'absolute',
    right: 120,
    top: 130,
    transform: [{rotate: '45deg'}]
  },
  smallArrow2: {
    flex: 1,
    position: 'absolute',
    right: 170,
    top: 200,
    transform: [{rotate: '180deg'}]
  },
  smallArrow3: {
    flex: 1,
    position: 'absolute',
    right: 210,
    top: 130,
    transform: [{rotate: '135deg'}]
  }
});

class Home extends Component {
  _onPressBtnCheckWeight() {
    console.log('_onPressBtnCheckWeight');
  }

  _onPressBtnCheckQty() {
    console.log('_onPressBtnCheckQty');
    DB.items.find().then((resp) => console.log(resp));
  }

  _onPressBtnAddItem() {
    this.props.navigator.replace({id: ADD_ITEM});
  }

  _onPressBtnSellItem() {
    console.log('_onPressBtnSellItem');
    this.props.navigator.replace({id: SELL_ITEM});
  }

  _onPressBtnExit() {
    console.log('_onPressBtnExit');
  }

  _renderHeading() {
    return (
      <View style={styles.heading}>
        <H1 labelStyles={styles.headingTitle}>Phần mềm quản</H1>
        <H1 labelStyles={styles.headingTitle}>lý</H1>
        <H1 labelStyles={styles.headingTitle}>Sản phẩm PVC</H1>
      </View>
    );
  }

  _renderCheckWeight() {
    return (
      <TouchableOpacity style={styles.checkWeight} onPress={this._onPressBtnCheckWeight.bind(this)}>
        <View>
          <Text style={[styles.checkWeightTitle, {marginLeft: 10}]}>KIỂM TRA</Text>
          <View style={{flex: 1}}/>
          <Text style={styles.checkWeightTitle}>KHỐI LƯỢNG</Text>
        </View>
      </TouchableOpacity>
    );
  }

  _renderCheckQty() {
    return (
      <TouchableOpacity style={styles.circleButton} onPress={this._onPressBtnCheckQty.bind(this)}>
        <Text>KIỂM TRA SỐ</Text>
        <View style={{flex: 1}}/>
        <Text>LƯỢNG</Text>
      </TouchableOpacity>
    );
  }

  _renderAddItem() {
    return (
      <TouchableOpacity style={[styles.circleButton, {top: 160, right: 220}]} onPress={this._onPressBtnAddItem.bind(this)}>
        <Text style={{marginTop: 5}}>NHẬP HÀNG</Text>
      </TouchableOpacity>
    );
  }

  _renderSellItem() {
    return (
      <TouchableOpacity style={[styles.circleButton, {top: 160, right: 40}]} onPress={this._onPressBtnSellItem.bind(this)}>
        <Text style={{marginTop: 5}}>BÁN HÀNG</Text>
      </TouchableOpacity>
    );
  }

  _renderButtonExit() {
    return (
      <TouchableOpacity style={styles.btnExit} onPress={this._onPressBtnExit.bind(this)}>
        <Image source={arrow} resizeMode={Image.resizeMode.contain}/>
        <Text style={styles.btnExitText}>Thoát</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
        <View style={styles.container}>
          <Image source={bg} resizeMode={Image.resizeMode.contain}/>
          {this._renderHeading()}
          {this._renderCheckQty()}
          {this._renderAddItem()}
          {this._renderSellItem()}
          {this._renderCheckWeight()}
          {this._renderButtonExit()}
          <View style={styles.smallArrow1}>
            <Image source={smallArrow} resizeMode={Image.resizeMode.contain}/>
          </View>
          <View style={styles.smallArrow2}>
            <Image source={smallArrow} resizeMode={Image.resizeMode.contain}/>
          </View>
          <View style={styles.smallArrow3}>
            <Image source={smallArrow} resizeMode={Image.resizeMode.contain}/>
          </View>
        </View>
    );
  }
}

Home.propTypes = { navigator: React.PropTypes.instanceOf(React.Navigator) };

export default Home;

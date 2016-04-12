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
import smallArrow from '../../img/right-arrow.png';
import { H1 } from './../../common/Heading';
import Dimensions from 'Dimensions';
import Device from 'react-native-device';
import {
  ADD_ITEM,
  SELL_ITEM,
  CHECK_QUANTITY,
  SUM
} from './../../../constants/screens';
var Firebase = require('firebase');
const DB = {
  'insert': Store.model('insert'),
  'sellitem': Store.model('sellitem'),
  'items': Store.model('items'),
  'update': Store.model('update')
};
const stylesIpad = StyleSheet.create({
  container: {
    flex: 1
  },
  heading: {
    flex: 1,
    position: 'absolute',
    top: 50,
    left: 0,
    width: Dimensions.get('window').width / 1.2,
    alignItems: 'center'
  },
  headingTitle: {
    color: '#FB8C00',
    textAlign: 'center',
    fontSize: 36
  },
  checkWeight: {
    flex: 1,
    position: 'absolute',
    bottom: 180,
    left: 50,
    width: 200,
    height: 100,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#81C784',
    backgroundColor: '#81C784',
    borderRadius: 10,
    padding: 30
  },
  checkWeightTitle: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: 18
  },
  circleTitle: {
    fontWeight: 'bold',
    color: '#333333',
    fontSize: 18
  },
  circleButton: {
    flex: 1,
    position: 'absolute',
    top: 100,
    right: 220,
    width: 200,
    height: 200,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FB8C00',
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    paddingTop: 60,
    paddingBottom: 60
  },
  smallArrow1: {
    flex: 1,
    position: 'absolute',
    right: 200,
    top: 320,
    transform: [{rotate: '45deg'}]
  },
  smallArrow2: {
    flex: 1,
    position: 'absolute',
    right: 300,
    top: 500,
    transform: [{rotate: '180deg'}]
  },
  smallArrow3: {
    flex: 1,
    position: 'absolute',
    right: 420,
    top: 320,
    transform: [{rotate: '135deg'}]
  }
});

const stylesIphone = StyleSheet.create({
  container: {
    flex: 1
  },
  heading: {
    flex: 1,
    position: 'absolute',
    top: 10,
    left: 10,
    width: Dimensions.get('window').width / 1.5,
    alignItems: 'center'
  },
  headingTitle: {
    color: '#FB8C00',
    textAlign: 'center',
    fontSize: 24
  },
  checkWeight: {
    flex: 1,
    position: 'absolute',
    bottom: 80,
    left: 20,
    width: 150,
    height: 70,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#81C784',
    backgroundColor: '#81C784',
    borderRadius: 10,
    padding: 20
  },
  checkWeightTitle: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: 13
  },
  circleButton: {
    flex: 1,
    position: 'absolute',
    top: 20,
    right: 160,
    width: 120,
    height: 120,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FB8C00',
    backgroundColor: '#FFFFFF',
    borderRadius: 60,
    paddingTop: 40,
    paddingBottom: 40
  },
  circleTitle: {
    fontWeight: 'bold',
    color: '#333333',
    fontSize: 13
  },
  smallArrow1: {
    flex: 1,
    position: 'absolute',
    right: 140,
    top: 150,
    transform: [{rotate: '45deg'}]
  },
  smallArrow2: {
    flex: 1,
    position: 'absolute',
    right: 210,
    top: 250,
    transform: [{rotate: '180deg'}]
  },
  smallArrow3: {
    flex: 1,
    position: 'absolute',
    right: 280,
    top: 150,
    transform: [{rotate: '135deg'}]
  }
});

var styles;

class Home extends Component {
  constructor(props) {
    super(props);
    var myFirebaseRef = new Firebase('https://pvc-data-api.firebaseio.com');
    this.itemsRef = myFirebaseRef.child('test');
  }

  componentWillMount() {
    var self = this;
    DB.update.find().then(function(res) {
      var last = res[res.length - 1];
      console.log(last);
      self.itemsRef.on('child_added', (dataSnapshot) => {
        if (dataSnapshot.key() === 'update') {
          if (dataSnapshot.val() < last.datetime) {
            console.log('Update data to server');
            DB.items.find().then(function(res) {
              var api = new Firebase('https://pvc-data-api.firebaseio.com/test');
              api.set({
                items: res,
                update: last.datetime,
                author: 'Libra Nguyen',
                app: 'PVC Manament'
              });
            });
          } else if (dataSnapshot.val() > last.datetime) {
            console.log('Update from server');
            var api = new Firebase('https://pvc-data-api.firebaseio.com/test');
            var data = api.child('items');
            data.on('child_added', (dt) => {
              var object = {
                dataSize: dt.val().dataSize,
                dataWidth: dt.val().dataWidth,
                dataColor: dt.val().dataColor,
                dataQty: dt.val().dataQty
              };
              DB.items.updateById(object, dt.val()._id).then(() => {});
            });
            const update = {
              datetime: dataSnapshot.val()
            };
            DB.update.add(update).then(() => { console.log('Update successfully'); });
          } else {
            console.log('No changes');
          }
        }
      });
    });
    if (Device.isIpad()) {
      styles = stylesIpad;
    } else {
      styles = stylesIphone;
    }
  }

  _onPressBtnCheckWeight() {
    console.log('_onPressBtnCheckWeight');
    this.props.navigator.replace({id: SUM});
  }

  _onPressBtnCheckQty() {
    console.log('_onPressBtnCheckQty');
    this.props.navigator.replace({id: CHECK_QUANTITY});
  }

  _onPressBtnAddItem() {
    this.props.navigator.replace({id: ADD_ITEM});
  }

  _onPressBtnSellItem() {
    console.log('_onPressBtnSellItem');
    this.props.navigator.replace({id: SELL_ITEM});
  }

  _renderHeading() {
    return (
      <View style={styles.heading}>
        <H1 labelStyles={styles.headingTitle}>PHẦN MỀM QUẢN LÍ</H1>
        <H1 labelStyles={styles.headingTitle}>SẢN PHẨM PVC</H1>
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
        <Text style={styles.circleTitle}>KIỂM TRA SỐ</Text>
        <View style={{flex: 1}}/>
        <Text style={styles.circleTitle}>LƯỢNG</Text>
      </TouchableOpacity>
    );
  }

  _renderAddItem() {
    if (Device.isIpad()) {
      return (
        <TouchableOpacity style={[styles.circleButton, {top: 400, right: 400, paddingTop: 90}]} onPress={this._onPressBtnAddItem.bind(this)}>
          <Text style={[{marginTop: 5}, styles.circleTitle]}>NHẬP HÀNG</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity style={[styles.circleButton, {top: 200, right: 20, paddingTop: 50}]} onPress={this._onPressBtnAddItem.bind(this)}>
          <Text style={[{marginTop: 5}, styles.circleTitle]}>NHẬP HÀNG</Text>
        </TouchableOpacity>
      );
    }
  }

  _renderSellItem() {
    if (Device.isIpad()) {
      return (
        <TouchableOpacity style={[styles.circleButton, {top: 400, right: 40, paddingTop: 90}]} onPress={this._onPressBtnSellItem.bind(this)}>
          <Text style={[{marginTop: 5}, styles.circleTitle]}>BÁN HÀNG</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity style={[styles.circleButton, {top: 200, right: 320, paddingTop: 50}]} onPress={this._onPressBtnSellItem.bind(this)}>
          <Text style={[{marginTop: 5}, styles.circleTitle]}>BÁN HÀNG</Text>
        </TouchableOpacity>
      );
    }
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

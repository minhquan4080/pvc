import React, {Component} from 'react-native';

const {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert
} = React;

import Store from 'react-native-store';
import btnBack from '../../img/btn_back.png';
import Dimensions from 'Dimensions';
import ButtonValue from './../../common/ButtonValueConfirm';
import Device from 'react-native-device';
import {
  SIZE_COLOR,
  WIDTH_COLOR,
  COLOR_COLOR
} from './../../../constants/colors';
import {
  ADD_ITEM,
  HOME
} from './../../../constants/screens';

const DB = {
  'insert': Store.model('insert'),
  'items': Store.model('items')
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  heading: {
    height: 30,
    paddingTop: 50,
    paddingBottom: 5,
    alignItems: 'center'
  },
  headingTitle: {
    color: '#448AFF',
    textAlign: 'center',
    fontSize: 36
  },
  sizeContainer: {
    borderWidth: 1,
    borderColor: '#333',
    height: 50,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 100,
    flexDirection: 'row'
  },
  widthContainer: {
    borderWidth: 1,
    borderColor: '#333',
    height: 90,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
    marginTop: 50
  },
  qtyContainer: {
    width: Dimensions.get('window').width / 1.3,
    borderWidth: 1,
    borderColor: '#333',
    height: 40,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
    marginTop: 50
  },
  labelTitle: {
    color: '#333',
    fontSize: 13,
    padding: 15
  },
  labelBlockTitle: {
    color: '#333',
    fontSize: 13,
    left: 10,
    top: 30
  },
  rowInput: {
    height: 50,
    marginLeft: 50,
    flexDirection: 'row'
  },
  rowInput2: {
    height: 30,
    flexDirection: 'row',
    position: 'absolute',
    top: 40,
    left: 100,
    paddingLeft: 8

  },
  defaultTextIput: {
    height: 30,
    width: 60,
    borderColor: '#333',
    borderWidth: 1,
    padding: 5,
    backgroundColor: '#FFFFFF50',
    color: '#333',
    marginTop: 10
  },
  arrowDecrease: {
    flex: 1,
    top: 3,
    marginLeft: 10,
    position: 'absolute',
    transform: [{rotate: '90deg'}]
  },
  arrowIncrease: {
    flex: 1,
    top: 3,
    marginLeft: 40,
    position: 'absolute',
    transform: [{rotate: '270deg'}]
  },
  btnConfirmAddItem: {
    position: 'absolute',
    bottom: 5,
    right: 10,
    borderWidth: 1,
    borderColor: '#333',
    height: 30,
    width: 100,
    alignItems: 'center',
    paddingTop: 6
  },
  btnBack: {
    position: 'absolute',
    top: 30,
    right: 10,
    alignItems: 'center'
  }
});

class ConfirmAddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSize: 0,
      dataWidth: 0,
      dataColor: 0,
      dataQty: '0'
    };
  }

  componentDidMount() {
    DB.insert.findById(1).then((resp) => this.setState(resp));
  }

  _handleButtonIncrease() {
    var current = parseInt(this.state.dataQty);
    current++;
    this.setState({dataQty: current.toString()});
  }

  _handleButtonDecrease() {
    var current = parseInt(this.state.dataQty);
    if (current > 0) {
      current--;
    }
    this.setState({dataQty: current.toString()});
  }

  _handleButtonConfirmItem() {
    if (this.state.dataSize === 0 || this.state.dataWidth === 0 || this.state.dataColor === 0 || parseInt(this.state.dataQty) === 0) {
      Alert.alert(
          'Lỗi',
          'Vui lòng nhập đầy đủ thông tin',
          [{text: 'OK', onPress: () => console.log('OK')}]
      );
    } else {
      console.log('Add item into data');
      var objectData = {
        dataSize: this.state.dataSize,
        dataWidth: this.state.dataWidth,
        dataColor: this.state.dataColor,
        dataQty: this.state.dataQty
      };
      DB.items.add(objectData).then(() => {
        this.props.navigator.replace({id: HOME});
      });
    }
  }

  _handleButtonBack() {
    this.props.navigator.replace({id: ADD_ITEM});
  }

  _renderSizeContainer() {
    const arr = [1.2, 1.4, 1.5, 1.6, 1.8];
    const dataSize = this.state.dataSize;
    return (
      <View style={styles.sizeContainer}>
        <Text style={styles.labelTitle}>KHỔ</Text>
        <View style={styles.rowInput}>
          {(() => {
            return arr.map((nbr) => {
              const status = nbr === dataSize ? 1 : 0;
              return (<ButtonValue key={nbr} color={SIZE_COLOR} dataStatus={status} dataValue={nbr} />);
            });
          })()}
          <TextInput keyboardType='numeric' style={[styles.defaultTextIput, {marginBottom: 10}]} placeholder='2.0' placeholderTextColor='#ccc' onChangeText={(dataSize) => this.setState({dataSize: parseFloat(dataSize)})} value={this.state.dataSize.toString()}/>
        </View>
      </View>
    );
  }

  _renderWidthContainer() {
    const arr = [5, 6, 7, 8, 9, 10];
    const arr2 = [11, 12, 15, 20, 50];
    const dataWidth = this.state.dataWidth;
    return (
      <View style={styles.widthContainer}>
        <Text style={styles.labelBlockTitle}>ĐỘ DÀY</Text>
        <View style={[styles.rowInput, {marginLeft: 60}]}>
          {(() => {
            return arr.map((nbr) => {
              const status = nbr === dataWidth ? 1 : 0;
              return <ButtonValue key={nbr} color={WIDTH_COLOR} dataStatus={status} dataValue={nbr} />;
            });
          })()}
        </View>
        <View style={styles.rowInput2}>
          {(() => {
            return arr2.map((nbr) => {
              const status = nbr === dataWidth ? 1 : 0;
              return <ButtonValue key={nbr} color={WIDTH_COLOR} dataStatus={status} dataValue={nbr} />;
            });
          })()}
          <TextInput keyboardType='numeric' style={[styles.defaultTextIput, {marginBottom: 10}]} placeholder='70' placeholderTextColor='#ccc' onChangeText={(dataWidth) => this.setState({dataWidth: parseInt(dataWidth)})} value={this.state.dataWidth.toString()}/>
        </View>
      </View>
    );
  }

  _renderColorContainer() {
    const arr = [1, 2, 3, 4, 5, 6];
    const arr2 = [7, 8, 9, 10, 11];
    const dataColor = this.state.dataColor;
    return (
      <View style={styles.widthContainer}>
        <Text style={styles.labelBlockTitle}>MÀU SẮC</Text>
        <View style={[styles.rowInput, {marginLeft: 50}]}>
          {(() => {
            return arr.map((nbr) => {
              const status = nbr === dataColor ? 1 : 0;
              return <ButtonValue key={nbr} color={COLOR_COLOR} dataStatus={status} dataValue={nbr} />;
            });
          })()}
        </View>
        <View style={styles.rowInput2}>
          {(() => {
            return arr2.map((nbr) => {
              const status = nbr === dataColor ? 1 : 0;
              return <ButtonValue key={nbr} color={COLOR_COLOR} dataStatus={status} dataValue={nbr} />;
            });
          })()}
          <TextInput keyboardType='numeric' style={[styles.defaultTextIput, {marginBottom: 10}]} placeholder='15' placeholderTextColor='#ccc' onChangeText={(dataColor) => this.setState({dataColor: parseInt(dataColor)})} value={this.state.dataColor.toString()}/>
        </View>
      </View>
    );
  }

  _renderQtyContainer() {
    return (
      <View style={styles.qtyContainer}>
        <Text style={[styles.labelTitle, {paddingTop: 10}]}>SỐ LƯỢNG</Text>
        <TextInput keyboardType='numeric' style={[styles.defaultTextIput, {marginTop: 5}]} placeholder='15' placeholderTextColor='#ccc' onChangeText={(dataQty) => this.setState({dataQty: dataQty})} value={this.state.dataQty}/>
      </View>
    );
  }

  _renderButtonBack() {
    if (Device.isIpad()) {
      return (
        <Image source={btnBack} resizeMode={Image.resizeMode.contain}/>
      );
    } else {
      return (
        <Image style={{width: 100, height: 40, top: 20}} source={btnBack} resizeMode={Image.resizeMode.contain}/>
      );
    }
  }

  render() {
    return (
        <ScrollView>
          <View style={styles.heading}>
            <Text style={styles.headingTitle}>BẠN ĐÃ NHẬP SẢN PHẨM</Text>
            <TouchableOpacity onPress={this._handleButtonBack.bind(this)} style={styles.btnBack}>
              {this._renderButtonBack()}
            </TouchableOpacity>
          </View>
          {this._renderSizeContainer()}
          {this._renderWidthContainer()}
          {this._renderColorContainer()}
          {this._renderQtyContainer()}
          <TouchableOpacity onPress={this._handleButtonConfirmItem.bind(this)} style={styles.btnConfirmAddItem}>
            <Text style={{fontWeight: 'bold'}}>XÁC NHẬN</Text>
          </TouchableOpacity>
        </ScrollView>
    );
  }
}

ConfirmAddItem.propTypes = { navigator: React.PropTypes.instanceOf(React.Navigator) };

export default ConfirmAddItem;

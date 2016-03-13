import React, {Component} from 'react-native';

const {
  View,
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
import {
  SIZE_COLOR,
  WIDTH_COLOR,
  COLOR_COLOR
} from './../../../constants/colors';
import {
  ADD_ITEM
} from './../../../constants/screens';

const DB = {
  'insert': Store.model('insert')
};
const prefixSttSize = 'dataSize';
const prefixSttWidth = 'dataWidth';
const prefixSttColor = 'dataColor';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  heading: {
    height: 30,
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: 'center'
  },
  headingTitle: {
    color: '#448AFF',
    textAlign: 'center',
    fontSize: 18
  },
  sizeContainer: {
    borderWidth: 1,
    borderColor: '#333',
    height: 50,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row'
  },
  widthContainer: {
    borderWidth: 1,
    borderColor: '#333',
    height: 90,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
    marginTop: 5
  },
  qtyContainer: {
    width: Dimensions.get('window').width / 2.7,
    borderWidth: 1,
    borderColor: '#333',
    height: 40,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
    marginTop: 5
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
    top: 1,
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
    DB.insert.findById(1).then((resp) => this.setState(resp));
  }

  componentDidMount() {
    this._setDataStatusSize();
    this._setDataStatusWidth();
    this._setDataStatusColor();
  }

  _setDataStatusSize() {
    var i = 1;
    while (i <= 5) {
      this.setState({ [prefixSttSize + i]: 0 });
      i++;
    }
  }

  _setDataStatusWidth() {
    var i = 1;
    while (i <= 11) {
      this.setState({ [prefixSttWidth + i]: 0 });
      i++;
    }
  }

  _setDataStatusColor() {
    var i = 1;
    while (i <= 11) {
      this.setState({ [prefixSttColor + i]: 0 });
      i++;
    }
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
      console.log('Redirect to confirm');
    }
  }

  _handleButtonBack() {
    this.props.navigator.replace({id: ADD_ITEM});
  }

  _renderSizeContainer() {
    return (
      <View style={styles.sizeContainer}>
        <Text style={styles.labelTitle}>KHỔ</Text>
        <View style={styles.rowInput}>
          <ButtonValue color={SIZE_COLOR} dataStatus={this.state[prefixSttSize + 1]} dataValue={1.2} />
          <ButtonValue color={SIZE_COLOR} dataStatus={this.state[prefixSttSize + 2]} dataValue={1.4} />
          <ButtonValue color={SIZE_COLOR} dataStatus={this.state[prefixSttSize + 3]} dataValue={1.5} />
          <ButtonValue color={SIZE_COLOR} dataStatus={this.state[prefixSttSize + 4]} dataValue={1.6} />
          <ButtonValue color={SIZE_COLOR} dataStatus={this.state[prefixSttSize + 5]} dataValue={1.8} />
          <TextInput keyboardType='numeric' style={[styles.defaultTextIput, {marginBottom: 10}]} placeholder='2.0' placeholderTextColor='#ccc' onChangeText={(dataSize) => this.setState({dataSize: parseInt(dataSize)})} value={this.state.dataSize.toString()}/>
        </View>
      </View>
    );
  }

  _renderWidthContainer() {
    return (
      <View style={styles.widthContainer}>
        <Text style={styles.labelBlockTitle}>ĐỘ DÀY</Text>
        <View style={[styles.rowInput, {marginLeft: 60}]}>
          <ButtonValue color={WIDTH_COLOR} dataStatus={this.state[prefixSttWidth + 1]} dataValue={5} />
          <ButtonValue color={WIDTH_COLOR} dataStatus={this.state[prefixSttWidth + 2]} dataValue={6} />
          <ButtonValue color={WIDTH_COLOR} dataStatus={this.state[prefixSttWidth + 3]} dataValue={7} />
          <ButtonValue color={WIDTH_COLOR} dataStatus={this.state[prefixSttWidth + 4]} dataValue={8} />
          <ButtonValue color={WIDTH_COLOR} dataStatus={this.state[prefixSttWidth + 5]} dataValue={9} />
          <ButtonValue color={WIDTH_COLOR} dataStatus={this.state[prefixSttWidth + 6]} dataValue={10} />
        </View>
        <View style={styles.rowInput2}>
          <ButtonValue color={WIDTH_COLOR} dataStatus={this.state[prefixSttWidth + 7]} dataValue={11} />
          <ButtonValue color={WIDTH_COLOR} dataStatus={this.state[prefixSttWidth + 8]} dataValue={12} />
          <ButtonValue color={WIDTH_COLOR} dataStatus={this.state[prefixSttWidth + 9]} dataValue={15} />
          <ButtonValue color={WIDTH_COLOR} dataStatus={this.state[prefixSttWidth + 10]} dataValue={20} />
          <ButtonValue color={WIDTH_COLOR} dataStatus={this.state[prefixSttWidth + 11]} dataValue={50} />
          <TextInput keyboardType='numeric' style={[styles.defaultTextIput, {marginBottom: 10}]} placeholder='70' placeholderTextColor='#ccc' onChangeText={(dataWidth) => this.setState({dataWidth: parseInt(dataWidth)})} value={this.state.dataWidth.toString()}/>
        </View>
      </View>
    );
  }

  _renderColorContainer() {
    return (
      <View style={styles.widthContainer}>
        <Text style={styles.labelBlockTitle}>MÀU SẮC</Text>
        <View style={[styles.rowInput, {marginLeft: 50}]}>
          <ButtonValue color={COLOR_COLOR} dataStatus={this.state[prefixSttColor + 1]} dataValue={1} />
          <ButtonValue color={COLOR_COLOR} dataStatus={this.state[prefixSttColor + 2]} dataValue={2} />
          <ButtonValue color={COLOR_COLOR} dataStatus={this.state[prefixSttColor + 3]} dataValue={3} />
          <ButtonValue color={COLOR_COLOR} dataStatus={this.state[prefixSttColor + 4]} dataValue={4} />
          <ButtonValue color={COLOR_COLOR} dataStatus={this.state[prefixSttColor + 5]} dataValue={5} />
          <ButtonValue color={COLOR_COLOR} dataStatus={this.state[prefixSttColor + 6]} dataValue={6} />
        </View>
        <View style={styles.rowInput2}>
          <ButtonValue color={COLOR_COLOR} dataStatus={this.state[prefixSttColor + 7]} dataValue={7} />
          <ButtonValue color={COLOR_COLOR} dataStatus={this.state[prefixSttColor + 8]} dataValue={8} />
          <ButtonValue color={COLOR_COLOR} dataStatus={this.state[prefixSttColor + 9]} dataValue={9} />
          <ButtonValue color={COLOR_COLOR} dataStatus={this.state[prefixSttColor + 10]} dataValue={10} />
          <ButtonValue color={COLOR_COLOR} dataStatus={this.state[prefixSttColor + 11]} dataValue={11} />
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

  render() {
    return (
        <View>
          <View style={styles.heading}>
            <Text style={styles.headingTitle}>BẠN ĐÃ NHẬP SẢN PHẨM</Text>
            <TouchableOpacity onPress={this._handleButtonBack.bind(this)} style={styles.btnBack}>
              <Image source={btnBack} resizeMode={Image.resizeMode.contain}/>
            </TouchableOpacity>
          </View>
          {this._renderSizeContainer()}
          {this._renderWidthContainer()}
          {this._renderColorContainer()}
          {this._renderQtyContainer()}
          <TouchableOpacity onPress={this._handleButtonConfirmItem.bind(this)} style={styles.btnConfirmAddItem}>
            <Text>XÁC NHẬN</Text>
          </TouchableOpacity>
        </View>
    );
  }
}

ConfirmAddItem.propTypes = { navigator: React.PropTypes.instanceOf(React.Navigator) };

export default ConfirmAddItem;

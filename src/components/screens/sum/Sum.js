import React, {Component} from 'react-native';

const {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity
} = React;

import Dimensions from 'Dimensions';
import btnBack from '../../img/btn_back.png';
import {
  HOME
} from './../../../constants/screens';

const prefixChild = 'childContainer';
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  heading: {
    height: 50,
    paddingTop: 30,
    paddingBottom: 5,
    alignItems: 'center'
  },
  headingTitle: {
    color: '#448AFF',
    textAlign: 'center',
    fontSize: 36
  },
  btnBack: {
    position: 'absolute',
    top: 30,
    right: 50,
    alignItems: 'center'
  },
  mainContainer: {
    width: Dimensions.get('window').width / 1.1,
    height: Dimensions.get('window').height / 1.9,
    borderWidth: 1,
    borderColor: '#333',
    marginLeft: 50,
    marginRight: 50,
    flex: 1,
    marginTop: 10
  },
  childContainer: {
    height: 50,
    borderWidth: 1,
    borderColor: '#333',
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  defaultTextIput: {
    height: 30,
    width: 60,
    borderColor: '#333',
    borderWidth: 1,
    padding: 5,
    backgroundColor: '#FFFFFF50',
    color: '#333',
    right: 10,
    top: 10,
    position: 'absolute'
  },
  defaultText: {
    color: '#333',
    textAlign: 'center',
    fontSize: 18,
    marginLeft: 10
  },
  rightContainer: {
    position: 'absolute',
    right: 50,
    width: 200,
    top: 180,
    height: 180,
    borderWidth: 1,
    borderColor: '#333',
    margin: 10,
    flexDirection: 'row',
    padding: 10
  },
  topContainer: {
    flexDirection: 'row',
    width: Dimensions.get('window').width / 1.1,
    height: 80,
    padding: 10,
    borderWidth: 1,
    borderColor: '#333',
    marginTop: 50,
    marginLeft: 50
  },
  rightTextIput: {
    height: 50,
    width: 180,
    borderColor: '#333',
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#FFFFFF50',
    color: '#333',
    position: 'absolute',
    top: 20,
    right: 10
  },
  topInput: {
    height: 50,
    width: 300,
    borderColor: '#333',
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#FFFFFF50',
    color: '#333',
    marginRight: 20
  },
  btnSum: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    borderWidth: 1,
    borderColor: '#333',
    height: 50,
    width: 180,
    alignItems: 'center',
    padding: 20
  }
});

class Sum extends Component {

  constructor(props) {
    super(props);
    this.state = {
      qty: 0,
      sum: 0
    };
  }

  componentDidMount() {

  }

  _handleButtonBack() {
    this.props.navigator.replace({id: HOME});
  }

  _setChild() {
    var i = 1;
    while (i <= this.state.qty) {
      this.setState({ [prefixChild + i]: 0 });
      i++;
    }
  }

  _handleButtonSum() {
    var sum = 0;
    var _qty = this.state.qty;
    for (var i = 1; i <= _qty; i++) {
      if (typeof this.state[prefixChild + i] !== 'undefined') {
        sum = sum + this.state[prefixChild + i];
      }
    }
    this.setState({sum: sum, status: true});
  }

  _changeText(num, val) {
    this.setState({ [prefixChild + num]: parseFloat(val), status: false });
  }

  _renderChild() {
    var _qty = this.state.qty;
    var indents = [];
    for (var i = 1; i <= _qty; i++) {
      indents.push(
        <View key={i} style={styles.childContainer}>
          <Text style={styles.defaultText}>NHẬP KHỐI LƯỢNG CÂY {i}</Text>
          <TextInput keyboardType='numeric' style={[styles.defaultTextIput]} placeholder='15' placeholderTextColor='#ccc' onChangeText={this._changeText.bind(this, i)}/>
        </View>
      );
    }
    return indents;
  }

  _renderRight() {
    return (
      <View style={styles.rightContainer}>
        <Text style={{flex: 1, fontWeight: 'bold', textAlign: 'center'}}>TỔNG KHỐI LƯỢNG</Text>
        <TextInput keyboardType='numeric' style={[styles.rightTextIput, {marginTop: 20}]} placeholder='15' placeholderTextColor='#ccc' value={this.state.sum.toString()} />
        <TouchableOpacity style={styles.btnSum} onPress={this._handleButtonSum.bind(this)}>
          <Text>TÍNH TỔNG</Text>
        </TouchableOpacity>
      </View>
    );
  }

  _renderTop() {
    return (
      <View style={styles.topContainer}>
        <Text style={{paddingTop: 20, textAlign: 'center', flex: 1, fontWeight: 'bold'}}>NHẬP VÀO SỐ CÂY</Text>
        <View style={{flex: 1}}></View>
        <TextInput style={styles.topInput} keyboardType='numeric' placeholder='15' placeholderTextColor='#ccc' onChangeText={(qty) => this.setState({qty: parseInt(qty)})}/>
      </View>
    );
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.heading}>
          <Text style={styles.headingTitle}>KIỂM TRA KHỐI LƯỢNG</Text>
          <TouchableOpacity onPress={this._handleButtonBack.bind(this)} style={styles.btnBack}>
            <Image source={btnBack} resizeMode={Image.resizeMode.contain}/>
          </TouchableOpacity>
        </View>
        {this._renderTop()}
        <View style={styles.mainContainer}>
          <ScrollView scrollEnabled={true} onScroll={() => { console.log('onScroll!'); }} scrollEventThrottle={200} style={styles.scrollView}>
            {this._renderChild()}
          </ScrollView>
        </View>
        {this._renderRight()}
      </ScrollView>
    );
  }
}

Sum.propTypes = { navigator: React.PropTypes.instanceOf(React.Navigator) };

export default Sum;

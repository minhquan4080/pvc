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
    paddingTop: 50,
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
    top: 50,
    right: 50,
    alignItems: 'center'
  },
  mainContainer: {
    width: Dimensions.get('window').width / 1.1,
    height: Dimensions.get('window').height / 1.8,
    borderWidth: 1,
    borderColor: '#333',
    marginLeft: 50,
    marginRight: 50,
    flex: 1,
    marginTop: 100
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
    width: 300,
    top: 150,
    height: 200,
    borderWidth: 1,
    borderColor: '#333',
    margin: 10,
    flexDirection: 'row',
    padding: 2
  },
  rightTextIput: {
    height: 50,
    width: 260,
    borderColor: '#333',
    borderWidth: 1,
    padding: 5,
    backgroundColor: '#FFFFFF50',
    color: '#333',
    position: 'absolute',
    top: 50,
    right: 15
  },
  btnAddItem: {
    position: 'absolute',
    bottom: 10,
    right: 15,
    borderWidth: 1,
    borderColor: '#333',
    height: 50,
    width: 260,
    alignItems: 'center',
    paddingTop: 15
  }
});

class Sum extends Component {

  constructor(props) {
    super(props);
    this.state = {
      qty: 0,
      status: false,
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
    if (this.state.status === false) {
      return (
        <View style={styles.rightContainer}>
            <Text style={{paddingLeft: 80, paddingTop: 20}} >NHẬP VÀO SỐ CÂY</Text>
            <TextInput keyboardType='numeric' style={[styles.rightTextIput]} placeholder='15' placeholderTextColor='#ccc' onChangeText={(qty) => this.setState({qty: parseInt(qty)})}/>
            <TouchableOpacity onPress={this._handleButtonSum.bind(this)} style={styles.btnAddItem}>
              <Text>TÍNH TỔNG</Text>
            </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.rightContainer}>
          <Text style={{paddingLeft: 80, paddingTop: 20}}>TỔNG KHỐI LƯỢNG</Text>
          <TextInput keyboardType='numeric' style={[styles.rightTextIput, {marginTop: 20}]} placeholder='15' placeholderTextColor='#ccc' value={this.state.sum.toString()} />
        </View>
      );
    }
  }

  render() {
    return (
        <View>
          <View style={styles.heading}>
            <Text style={styles.headingTitle}>KIỂM TRA KHỐI LƯỢNG</Text>
            <TouchableOpacity onPress={this._handleButtonBack.bind(this)} style={styles.btnBack}>
              <Image source={btnBack} resizeMode={Image.resizeMode.contain}/>
            </TouchableOpacity>
          </View>
          <View style={styles.mainContainer}>
            <ScrollView scrollEnabled={true} onScroll={() => { console.log('onScroll!'); }} scrollEventThrottle={200} style={styles.scrollView}>
              {this._renderChild()}
            </ScrollView>
          </View>
          {this._renderRight()}
        </View>
    );
  }
}

Sum.propTypes = { navigator: React.PropTypes.instanceOf(React.Navigator) };

export default Sum;

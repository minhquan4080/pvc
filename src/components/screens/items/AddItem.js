import React, {Component} from 'react-native';

const {
  View,
  StyleSheet,
  Text
} = React;

import ButtonValue from './../../common/ButtonValue';

const prefixSttSize = 'dataSize';

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
  labelTitle: {
    color: '#333',
    fontSize: 13,
    padding: 15
  },
  rowInput: {
    height: 50,
    marginLeft: 50,
    flexDirection: 'row'
  }
});

class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSize: null
    };
  }

  componentDidMount() {
    this._setDataStatusSize();
  }

  _handleSelect(prefix, val, dataValue) {
    switch (prefix) {
      case prefixSttSize:
        var status = (this.state[prefix + val] === 0) ? 1 : 0;
        var value = (this.state[prefix + val] === 0) ? dataValue : null;
        this._setDataStatusSize();
        break;
    }
    this.setState({
      [prefix + val]: status,
      [prefix]: value
    });
  }

  _setDataStatusSize() {
    var i = 1;
    while (i <= 5) {
      this.setState({ [prefixSttSize + i]: 0 });
      i++;
    }
  }

  render() {
    return (
        <View>
          <View style={styles.heading}>
            <Text style={styles.headingTitle}>NHẬP HÀNG</Text>
          </View>
          <View style={styles.sizeContainer}>
            <Text style={styles.labelTitle}>KHỔ</Text>
            <View style={styles.rowInput}>
              <ButtonValue onPress={this._handleSelect.bind(this, prefixSttSize, 1, 1.2)} dataStatus={this.state[prefixSttSize + 1]} dataValue={1.2} />
              <ButtonValue onPress={this._handleSelect.bind(this, prefixSttSize, 2, 1.4)} dataStatus={this.state[prefixSttSize + 2]} dataValue={1.4} />
              <ButtonValue onPress={this._handleSelect.bind(this, prefixSttSize, 3, 1.5)} dataStatus={this.state[prefixSttSize + 3]} dataValue={1.5} />
              <ButtonValue onPress={this._handleSelect.bind(this, prefixSttSize, 4, 1.6)} dataStatus={this.state[prefixSttSize + 4]} dataValue={1.6} />
              <ButtonValue onPress={this._handleSelect.bind(this, prefixSttSize, 5, 1.8)} dataStatus={this.state[prefixSttSize + 5]} dataValue={1.8} />
            </View>
          </View>
        </View>
    );
  }
}

AddItem.propTypes = { navigator: React.PropTypes.instanceOf(React.Navigator) };

export default AddItem;

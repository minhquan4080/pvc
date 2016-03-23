import React, {Component} from 'react-native';

const {
  View,
  StyleSheet,
  Text,
  TouchableOpacity
} = React;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  circleButton: {
    flex: 1,
    width: 30,
    height: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginTop: 10,
    padding: 5,
    marginRight: 25
  },
  circleText: {
    fontSize: 11,
    color: '#FFFFFF'
  },
  circleButtonActive: {
    flex: 1,
    width: 30,
    height: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 10,
    padding: 5,
    marginRight: 25
  },
  circleTextActive: {
    fontSize: 11,
    color: '#fff'
  }
});

class ButtonValueConfirm extends Component {
  constructor(props) {
    super(props);
    this.handleButtonClicked = this.handleButtonClicked.bind(this);
  }

  handleButtonClicked(ev) {
    if (this.props.onPress) {
      this.props.onPress(ev);
    }
  }

  render() {
    var circleButtonStyle = (this.props.dataStatus === 0) ? styles.circleButton : [styles.circleButtonActive, {backgroundColor: this.props.color}, {borderColor: this.props.color}];
    var circleTextStyle = (this.props.dataStatus === 0) ? styles.circleText : styles.circleTextActive;
    return (
        <View style={styles.container}>
          <TouchableOpacity style={circleButtonStyle} onPress={this.handleButtonClicked}>
            <Text style={circleTextStyle}>{this.props.dataValue}</Text>
          </TouchableOpacity>
        </View>
    );
  }
}

ButtonValueConfirm.propTypes = {
  dataValue: React.PropTypes.number,
  dataStatus: React.PropTypes.number,
  onPress: React.PropTypes.func,
  color: React.PropTypes.string };

export default ButtonValueConfirm;

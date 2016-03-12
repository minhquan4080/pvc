import React, {Component} from 'react-native';

const {
  View,
  StyleSheet,
  Text
} = React;

import Dimensions from 'Dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  heading: {
    flex: 1,
    position: 'absolute',
    top: 10,
    left: 0,
    width: Dimensions.get('window').width / 1.2,
    alignItems: 'center'
  },
  headingTitle: {
    color: '#FB8C00',
    textAlign: 'center',
    fontSize: 28
  }
});

class Blank extends Component {
  render() {
    return (
        <View style={styles.container}>
          <Text>Blank Screen</Text>
        </View>
    );
  }
}

Blank.propTypes = { navigator: React.PropTypes.instanceOf(React.Navigator) };

export default Blank;

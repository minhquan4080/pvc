import React, {Component} from 'react-native';

const {
  View,
  StyleSheet,
  Image,
  Text
} = React;

import bg from '../../img/background.jpg';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  heading: {
    flex: 1,
    position: 'absolute',
    top: 20
  }
});

class Home extends Component {
  render() {
    return (
        <View style={styles.container}>
          <Image source={bg} resizeMode={Image.resizeMode.contain}/>
          <View style={styles.heading}>
            <Text>PVC Management</Text>
          </View>
        </View>
    );
  }
}

Home.propTypes = { navigator: React.PropTypes.instanceOf(React.Navigator) };

export default Home;

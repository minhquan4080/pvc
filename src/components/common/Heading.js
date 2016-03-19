'use strict';

import React, {
    Component,
    Text
} from 'react-native';

const TextStylePropTypes = require('TextStylePropTypes');
const StyleSheetPropType = require('StyleSheetPropType');
const ViewStylePropTypes = require('ViewStylePropTypes');
const stylePropType = StyleSheetPropType(ViewStylePropTypes);
const labelStylePropType = StyleSheetPropType(TextStylePropTypes);

class BaseHeading extends Component {

  static propTypes = {
    styles: stylePropType,
    labelStyles: labelStylePropType,
    fontSize: React.PropTypes.number
  };

  constructor(props) {
    super(props);
    if (isNaN(props.fontSize)) {
      this.fontSize = 8;
    }
  }

  render() {
    var labelStyles = [{fontSize: this.fontSize, fontWeight: 'bold', color: '#FFFFFF'}];
    if (this.props.labelStyles) {
      labelStyles.push(this.props.labelStyles);
    }
    return (
          <Text style={labelStyles}>
            {this.props.children}
          </Text>
    );
  }

}

class H1 extends BaseHeading {

  constructor(props) {
    super(props);
    this.fontSize = 32;
  }

}

class H2 extends BaseHeading {
  constructor(props) {
    super(props);
    this.fontSize = 24;
  }

}

class H3 extends BaseHeading {

  constructor(props) {
    super(props);
    this.fontSize = 18;
  }

}

class H5 extends BaseHeading {

  constructor(props) {
    super(props);
    this.fontSize = 13;
  }

}

module.exports = {
  H1: H1,
  H2: H2,
  H3: H3,
  H5: H5
};

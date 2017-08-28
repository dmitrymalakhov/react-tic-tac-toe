/**
 * @author Dmitry Malakhov
 */

'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import NameStyled from './styled/NameStyled';
import ScoreStyled from './styled/ScoreStyled';
import UserInfoStyled from './styled/UserInfoStyled';

const propTypes = {
  name: PropTypes.string,
  score: PropTypes.number,
};

const defaultProps = {
  name: '',
  score: 0,
};

const UserInfo = props => (
  <UserInfoStyled>
    <NameStyled>
      {props.name}
    </NameStyled>
    <ScoreStyled>
      {props.score}
    </ScoreStyled>
  </UserInfoStyled>
);

UserInfo.propTypes = propTypes;
UserInfo.defaultProps = defaultProps;
UserInfo.displayName = 'UserInfo';

export default UserInfo;

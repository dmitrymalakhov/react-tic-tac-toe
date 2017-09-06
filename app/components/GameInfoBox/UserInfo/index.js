/**
 * @author Dmitry Malakhov
 */

'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import NameStyled from './styled/NameStyled';
import ScoreStyled from './styled/ScoreStyled';
import UserInfoStyled from './styled/UserInfoStyled';
import { parseFloatRound2 } from '../../../../utils/misc';

const propTypes = {
  name: PropTypes.string,
  score: PropTypes.number,
  active: PropTypes.bool,
};

const defaultProps = {
  name: '',
  score: 0,
  active: false,
};

const UserInfo = ({ name, score, active }) => (
  <UserInfoStyled active={active}>
    <NameStyled>
      {name}
    </NameStyled>
    <ScoreStyled>
      {parseFloatRound2(score)}
    </ScoreStyled>
  </UserInfoStyled>
);

UserInfo.propTypes = propTypes;
UserInfo.defaultProps = defaultProps;
UserInfo.displayName = 'UserInfo';

export default UserInfo;

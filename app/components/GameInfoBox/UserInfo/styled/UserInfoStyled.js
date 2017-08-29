/**
 * @author Dmitry Malakhov
 */

'use strict';

import styled from 'styled-components';

const background = ({ active }) => active
  ? 'background: #dddddd'
  : null;

export default styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  ${background}
`;

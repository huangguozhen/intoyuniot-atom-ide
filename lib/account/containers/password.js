/** @babel */

/**
 * Copyright (c) 2016-present PlatformIO <contact@platformio.org>
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */


import ChangePasswordContainer from './change-password-container';
import React from 'react';

export default class PasswordPage extends React.Component {

  render() {
    return (
      <div className='password-page'>
        <ChangePasswordContainer />
      </div>);
  }

}

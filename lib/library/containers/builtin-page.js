/** @babel */

/**
 * Copyright (c) 2016-present PlatformIO <contact@platformio.org>
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import * as actions from '../actions';

import { BUILTIN_INPUT_FILTER_KEY, getBuiltinFilter, getVisibletBuiltinLibs } from '../selectors';

import { INPUT_FILTER_DELAY } from '../../config';
import { LibraryStorage } from '../storage';
import LibraryStoragesList from '../components/storages-list';
import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { goTo } from '../../core/helpers';
import { lazyUpdateInputValue } from '../../core/actions';


class LibraryBuiltinPage extends React.Component {

  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.instanceOf(LibraryStorage).isRequired
    ),
    filterValue: PropTypes.string,
    loadBuiltinLibs: PropTypes.func.isRequired,
    searchLibrary: PropTypes.func.isRequired,
    showLibrary: PropTypes.func.isRequired,
    showInstalledPlatforms: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.loadBuiltinLibs();
  }

  render() {
    return (
      <div>
        <div className='block text'>
        {/*
          <span className='icon icon-question'></span> A list of built-in libraries in the installed <a onClick={ () => this.props.showInstalledPlatforms() }>frameworks and development platforms</a>.
        */}
        </div>
        <LibraryStoragesList {...this.props} />
      </div>
    );
  }

}

// Redux

function mapStateToProps(state, ownProps) {
  return {
    items: getVisibletBuiltinLibs(state),
    filterValue: getBuiltinFilter(state),
    searchLibrary: (query, page) => goTo(ownProps.history, '/lib/registry/search', { query, page }),
    showLibrary: idOrManifest => goTo(ownProps.history, '/lib/builtin/show', { idOrManifest }),
    showInstalledPlatforms: () => goTo(ownProps.history, '/platform/installed')
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, actions, {
    setFilter: value => dispatch(lazyUpdateInputValue(BUILTIN_INPUT_FILTER_KEY, value, INPUT_FILTER_DELAY))
  }), dispatch);
}

function mergeProps(stateProps, dispatchProps) {
  return Object.assign({}, stateProps, dispatchProps);
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(LibraryBuiltinPage);

import React from 'react';
// import PropTypes from 'prop-types';

import { CommonLayout } from '../../layouts';

import UserListContainer from './containers/UserListContainer';

class UserListPage extends React.Component {
  render() {
    return (
      <CommonLayout title="C3Interview">
        <UserListContainer />
      </CommonLayout>
    );
  }
}

export default UserListPage;

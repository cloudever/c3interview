/* eslint-disable import/named */

import React from 'react';
import { Query } from 'react-apollo';

import { GetUsers } from '@app/data/graphql/users';

import { UserList } from '../../../app';

const UserListContainer = () => (
  <Query asyncMode query={GetUsers}>
    {({ data, loading }) => {
      if (loading) {
        return 'Loading...';
      }

      if (data) {
        const { Users: users } = data;
        return <UserList items={users} />;
      }

      return 'No users found for your request!';
    }}
  </Query>
);

export default UserListContainer;

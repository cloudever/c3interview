import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import styled from 'styled-components';
import VirtualList from 'react-virtual-list';

import { UserType } from '@app/config/prop-types';

const List = styled.ul`
  margin: 0;
`;

const ListItem = styled.li`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid;
  padding: 10px 0px;
`;

const Avatar = styled.img`
  width: 20px;
  height: 20px;
`;

const LoginLink = styled(Link)`
  display: block;
`;

class UserList extends React.Component {
  static propTypes = {
    virtual: PropTypes.shape({
      items: PropTypes.arrayOf(UserType),
    }).isRequired,
    itemHeight: PropTypes.number.isRequired,
  };

  render() {
    const { virtual, itemHeight } = this.props;

    return (
      <List style={virtual.style}>
        {virtual.items.map(({ ID, AvatarURL, Login }) => (
          <ListItem key={ID} style={{ height: itemHeight }}>
            <Avatar src={AvatarURL} />
            <LoginLink>{Login}</LoginLink>
          </ListItem>
        ))}
      </List>
    );
  }
}

export default VirtualList()(UserList);

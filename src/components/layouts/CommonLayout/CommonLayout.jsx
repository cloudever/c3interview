import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 0 auto;
  width: 1200px;
`;

const Header = styled.div`
  margin-top: 200px;
`;

const HeaderTitle = styled.h1`
  text-align: center;
  color: greenyellow;
`;

const Content = styled.div`
  margin-top: 20px;
`;

class CommonLayout extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
  };

  render() {
    const { title, children } = this.props;

    return (
      <Wrapper>
        <Header>
          <HeaderTitle>{title}</HeaderTitle>
        </Header>
        <Content>{children}</Content>
      </Wrapper>
    );
  }
}

export default CommonLayout;

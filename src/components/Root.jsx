import React from 'react';
import { hot } from 'react-hot-loader';

import { Router } from 'react-router';
import { ApolloProvider } from 'react-apollo';

import { createBrowserHistory } from '@app/services/history/create';
import { createApolloClient } from '@app/services/graphql/client';
import { GRAPHQL_URL } from '@app/config/constants';

import Routes from './routes/Routes';

const apollo = createApolloClient(GRAPHQL_URL);
const history = createBrowserHistory();

class Root extends React.Component {
  render() {
    return (
      <ApolloProvider client={apollo}>
        <Router history={history}>
          <Routes />
        </Router>
      </ApolloProvider>
    );
  }
}

export default hot(module)(Root);

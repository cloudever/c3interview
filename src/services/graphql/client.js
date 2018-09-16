import ApolloClient from 'apollo-boost';

const createApolloClient = uri => {
  const client = new ApolloClient({
    uri,
  });

  return client;
};

export { createApolloClient };

import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client';
import { setContext } from "@apollo/client/link/context";

const httpLink = new HttpLink({
  uri: 'https://obscure-journey-32434.herokuapp.com/'
});

const authLink = setContext(() => {
  const token = localStorage.getItem('jwtToken');
  return {
    headers: { Authorization: token ? `Bearer ${token}` : ''}
  }
}) 

const client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache
})

// const client = new ApolloClient({
//   uri: 'http://localhost:5000',
//   cache: new InMemoryCache()
// });

export default (
  <ApolloProvider client={client} >
    <App />
  </ApolloProvider>
)
import faunadb from 'faunadb';
import { GraphQLClient } from 'graphql-request';

export const client = new faunadb.Client({secret: process.env.NEXT_PUBLIC_FAUNA_GUEST_SECRET});

const endpoint = 'https://graphql.fauna.com/graphql';

//  valid token to make request to fauandb will be stored in cookies.authToken
export const graphQLClient = (token) => {
	const secret = token || process.env.NEXT_PUBLIC_FAUNA_GUEST_SECRET;
  
	return new GraphQLClient(endpoint, {
	  headers: {
		authorization: `Bearer ${secret}`,
	  },
	});
  };

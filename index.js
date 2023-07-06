import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { schema } from './graphql/schema/schema.js';
import 'dotenv/config';

const port = process.env.PORT || 5000;
const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
  })
);

app.listen(port, console.log(`Server starting on port: ${port}`));

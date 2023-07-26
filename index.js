import express from 'express';
import 'dotenv/config';
import 'colors';
import { graphqlHTTP } from 'express-graphql';
import { schema } from './graphql/schema/schema.js';
import { connectDB } from './db/db.js';
import cors from 'cors';

const port = process.env.PORT || 5000;
const app = express();

// Connect DB
connectDB();

app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
  })
);

app.listen(port, console.log(`Server starting on port: ${port}`));

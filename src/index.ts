import { Express } from 'express';
import * as express from 'express';
import * as dotenv from 'dotenv';
import { initializeDataSource } from "./data-source"
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';
import { ProductResolver } from './resolvers/Product.resolver';
import { OrderResolver } from './resolvers/Order.resolver';


dotenv.config();

const main = async () => {
    const { ENV_VARIABLES } = require('./config');

    const schema = await buildSchema({
        resolvers: [ProductResolver, OrderResolver],
        validate: false
    });
    const apolloServer = new ApolloServer({
        schema
    });

    const app: Express = express();
    apolloServer.applyMiddleware({
        app,
        path: '/graphql'
    });

    initializeDataSource();

    app.listen(ENV_VARIABLES.PORT);

}

main();



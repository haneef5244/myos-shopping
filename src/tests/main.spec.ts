import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { ProductResolver } from '../resolvers/Product.resolver'
import { OrderResolver } from '../resolvers/Order.resolver'
import { DataSource } from 'typeorm'
import { Product } from '../entitities/Product.entity'

let server: ApolloServer

const TestAppDataSource = new DataSource({
    type: "sqlite",
    database: "./src/tests/db-test.sqlite",
    synchronize: true,
    logging: false,
    entities: ["./src/**/**.entity{.ts,.js}"],
    migrations: ["1670698883212-myMigration.ts"],
    subscribers: [],
})

const productSeed = async (dataSource) => dataSource.manager.createQueryBuilder()
    .insert()
    .into(Product)
    .values([
        { id: '6fb77aa3-91a8-42a2-b2c4-567d6b545143', title: 'Test Gardenia Bread', description: 'Test Delicious bread', picture: 'somebase64', price: 50, quantity: 500 },
        { id: '3e6662aa-4534-4c06-8dde-e6dae5ce0cef', title: 'Test Pizza', description: 'Test Pizza', picture: 'somebase64', price: 40, quantity: 500 },
    ])
    .execute();

describe('Integration test with resolvers using test db', () => {

    beforeAll(async () => {
        await TestAppDataSource.initialize();
        await productSeed(TestAppDataSource);
        const schema = await buildSchema({
            resolvers: [ProductResolver, OrderResolver],
            validate: false,
        });

        server = new ApolloServer({
            schema,
        })

    })

    afterAll(async () => {
        await TestAppDataSource.dropDatabase();
        await server.stop();
    })

    it('should return all data', async () => {
        const result = await server.executeOperation({
            query: `
            query get {
                getProducts {
                  id,
                  title,
                  description,
                  price,
                  picture,
                  quantity
                }
              }
            `,
        })
        expect(result.errors).toBe(undefined);
        expect(result.data.getProducts[0].title).toEqual('Test Gardenia Bread');
        expect(result.data.getProducts.length).toEqual(2);
    })

    it('should return only products with Pizza in the title', async () => {
        const result = await server.executeOperation({
            query: `
            query get {
                getProductsByTitleOrDescription(title: "Pizza") {
                  id,
                  title,
                  description,
                  price,
                  picture,
                  quantity
                }
              }
            `,
        })
        expect(result.errors).toBe(undefined);
        expect(result.data.getProductsByTitleOrDescription[0].title.includes('Pizza')).toBe(true);
    })
})

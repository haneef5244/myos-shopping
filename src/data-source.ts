import "reflect-metadata"
import { DataSource } from "typeorm"
import { Order } from "./entitities/Order.entity"
import { Product } from "./entitities/Product.entity"
import { ProductOrder } from "./entitities/ProductOrder.entity"

const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./src/db.sqlite",
    synchronize: true,
    logging: false,
    entities: ["src/**/**.entity{.ts,.js}"],
    migrations: ["1670698883212-myMigration.ts"],
    subscribers: [],
})

const initializeDataSource = async () => {
    AppDataSource.initialize().then(async () => {
        await AppDataSource.manager.createQueryBuilder()
            .delete()
            .from(ProductOrder)
            .execute();
        await AppDataSource.manager.createQueryBuilder()
            .delete()
            .from(Order)
            .execute();

        await AppDataSource.manager.createQueryBuilder()
            .delete()
            .from(Product)
            .execute();
        await AppDataSource.manager.createQueryBuilder()
            .insert()
            .into(Product)
            .values([
                { title: 'Gardenia Bread', description: 'Delicious bread', picture: 'somebase64', price: 50, quantity: 500 },
                { title: 'Double Cheese Burger', description: 'Delicious burger', picture: 'somebase64', price: 41, quantity: 500 },
                { title: 'Stuffed Crust Pizza', description: 'Delicious pizza', picture: 'somebase64', price: 60, quantity: 500 },
            ])
            .execute();
    })
}

export { initializeDataSource, AppDataSource };

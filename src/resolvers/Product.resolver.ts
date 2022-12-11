import { Arg, Query, Resolver } from "type-graphql";
import { Like } from "typeorm";
import { Product } from "../entitities/Product.entity";
import { OrderBy } from "../models/OrderBy.model";

@Resolver()
export class ProductResolver {
    @Query(() => [Product])
    getProducts(
        @Arg("orderBy", { nullable: true }) orderBy: OrderBy
    ) {
        if (orderBy && ['asc', 'desc'].includes(orderBy.price)) {
            return Product.find({
                order: {
                    price: orderBy.price == 'asc' ? 'asc' : 'desc'
                }
            })
        }
        return Product.find();
    }

    @Query(() => [Product])
    getProductsByTitleOrDescription(
        @Arg("title", { nullable: true }) title: string,
        @Arg("description", { nullable: true }) description: string,
        @Arg("orderBy", { nullable: true }) orderBy: OrderBy
    ) {
        let whereClause = {};
        let orderClause = {};
        let conditions = {};

        if (title) whereClause[`title`] = Like(`%${title}%`);
        if (description) whereClause[`description`] = Like(`%${description}`);
        if (orderBy && orderBy.price && ['asc', 'desc'].includes(orderBy.price)) {
            orderClause = { price: orderBy.price }
        }
        if (Object.keys(whereClause).length > 0) {
            conditions = {
                where: {
                    ...whereClause
                }
            }
        }
        if (Object.keys(orderClause).length > 0) {
            conditions = {
                ...conditions,
                order: { ...orderClause }
            }
        }
        return Product.find(conditions);
    }
}
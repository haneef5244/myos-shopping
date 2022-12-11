import { ProductCreateOrder } from "../model/ProductCreateOrder.model";
import { Arg, Mutation, Resolver } from "type-graphql";
import { AppDataSource } from "../data-source";
import { Order } from "../entity/Order.entity";
import { Product } from "../entity/Product.entity";
import { ProductOrder } from "../entity/ProductOrder.entity";

@Resolver(Order)
export class OrderResolver {
    @Mutation(() => [ProductOrder])
    createOrder(
        @Arg("orders", () => [ProductCreateOrder]) orders: [ProductCreateOrder]
    ) {
        return new Promise((resolve, reject) => {
            AppDataSource.transaction(async (transactionalEntityManager) => {
                const newProductOrders: ProductOrder[] = [];
                const newOrder: Order = new Order();
                newOrder.created_date = new Date();
                await transactionalEntityManager.save(newOrder)

                for (let i of orders) {
                    // Update Product quantity
                    const productProperty = await transactionalEntityManager
                        .getRepository(Product)
                        .findOneOrFail({
                            where: { id: i.id }
                        })

                    if (productProperty.getQuantity() - i.quantity < 0) {
                        throw (new Error(`Product ${productProperty.title} is not available!`));
                    } else {
                        productProperty.setQuantity(productProperty.getQuantity() - i.quantity)
                    }
                    await transactionalEntityManager.save(productProperty);
                    // end Update Product quantity
                    const newProductOrder: ProductOrder = new ProductOrder();
                    newProductOrder.order = newOrder;
                    newProductOrder.product = productProperty;
                    newProductOrder.quantity = i.quantity;
                    newProductOrders.push(newProductOrder);
                }
                return transactionalEntityManager.save(newProductOrders);
            }).then((res: ProductOrder[]) => {
                resolve(res);
            }).catch(err => reject(err))
        })


    }


}
import { Order } from '../../entity/Order.entity'
import { ProductOrder } from '../../entity/ProductOrder.entity';
describe("Order entity", () => {

    it('tests Order entity is working', () => {
        const newProductOrderId = 'c7b68aa6-1234-4e49-9df5-de9b21c86c9f'
        const newOrder: Order = new Order();
        newOrder.id = 'c7b68aa6-6861-4e49-9df5-de9b21c86c9f';

        const productOrders: ProductOrder[] = [];
        const newProductOrder: ProductOrder = new ProductOrder();
        newProductOrder.id = newProductOrderId;
        productOrders.push(newProductOrder);
        newOrder.productOrders = productOrders;

        expect(newOrder.productOrders.length).toBe(1);
        expect(newOrder.productOrders[0].id).toBe(newProductOrderId);
    })
})
import { Product } from '../../entitities/Product.entity';
import { ProductOrder } from '../../entitities/ProductOrder.entity';
describe("Order entity", () => {

    it('tests Order entity is working', () => {
        const newProductOrderId = 'c7b68aa6-1234-4e49-9df5-de9b21c86c9f'
        const newProduct = new Product();
        newProduct.id = 'c7b68aa6-6861-4e49-9df5-de9b21c86c9f';

        const productOrders = [];
        const newProductOrder = new ProductOrder();
        newProductOrder.id = newProductOrderId;
        productOrders.push(newProductOrder);
        newProduct.productOrders = productOrders;

        expect(newProduct.productOrders.length).toBe(1);
        expect(newProduct.productOrders[0].id).toBe(newProductOrderId);
    })
})
import { Field, ID, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from "typeorm"
import { Order } from "./Order.entity";
import { Product } from "./Product.entity";

@Entity()
@ObjectType()
export class ProductOrder extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Field()
    @Column()
    quantity: number

    @ManyToOne(() => Product, (product) => product.id)
    product: Product

    @ManyToOne(() => Order, (order) => order.id)
    order: Order
}

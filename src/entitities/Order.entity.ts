import { Field, ID, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { ProductOrder } from "./ProductOrder.entity";

@Entity()
@ObjectType()
export class Order {
    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Field()
    @Column()
    created_date: Date

    @OneToMany(() => ProductOrder, (productOrder) => productOrder.order)
    productOrders: ProductOrder[]
}

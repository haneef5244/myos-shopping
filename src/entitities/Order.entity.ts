import { Field, ID, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm"
import { ProductOrder } from "./ProductOrder.entity";

@Entity()
@ObjectType()
export class Order extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Field()
    @Column()
    created_date: Date

    @OneToMany(() => ProductOrder, (productOrder) => productOrder.order)
    productOrders: ProductOrder[]
}

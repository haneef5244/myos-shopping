import { Field, ID, ObjectType } from "type-graphql"
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm"
import { ProductOrder } from "./ProductOrder.entity"

@Entity()
@ObjectType()
export class Product extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Field()
    @Column()
    title: string

    @Field()
    @Column()
    description: string

    @Field()
    @Column()
    picture: string

    @Field()
    @Column()
    price: number

    @Field()
    @Column()
    quantity: number

    @OneToMany(() => ProductOrder, (productOrder) => productOrder.product)
    productOrders: ProductOrder[]

    getQuantity = () => this.quantity;

    setQuantity = (quantity: number) => {
        this.quantity = quantity;
    }

}

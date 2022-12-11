import { Field, InputType } from "type-graphql"

@InputType()
export class ProductCreateOrder {
    @Field(() => String)
    id: string

    @Field(() => Number)
    quantity: number
}
import { Field, InputType } from "type-graphql"

@InputType()
export class OrderBy {

    @Field(() => String)
    price: string

}

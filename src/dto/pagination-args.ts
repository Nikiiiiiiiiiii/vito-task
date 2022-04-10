import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class PaginationArgs {
  @Field(() => Int)
  page = 1;

  @Field(() => Int)
  itemsPerPage = 10;
}

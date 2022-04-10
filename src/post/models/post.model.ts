import { Field, ObjectType } from '@nestjs/graphql';
import { MaybeDocument } from 'nano';
import { RequiredFields } from '../../database/services/document.service';
import { Model } from '../../database/utils/Model.util';

@ObjectType()
export class Post extends RequiredFields implements MaybeDocument {
  constructor(post: Model<Post>) {
    super(Post.name);
    this.name = post.name;
    this.body = post.body;
    this.email = post.email;
  }
  @Field(() => String)
  readonly name: string;
  @Field(() => String)
  readonly body: string;
  @Field(() => String)
  readonly email: string;
}

import { Field, ObjectType } from '@nestjs/graphql';
import { MaybeDocument } from 'nano';

import { RequiredFields } from '../../database/services/document.service';
import { Model } from '../../database/utils/Model.util';

@ObjectType()
export class Comment extends RequiredFields implements MaybeDocument {
  constructor(comment: Model<Comment>) {
    super(Comment.name);

    this.title = comment.title;
    this.body = comment.body;
    this.post_id = comment.post_id;
  }

  @Field(() => String)
  readonly title: string;
  @Field(() => String)
  readonly body: string;
  @Field(() => String)
  readonly post_id: string;
}

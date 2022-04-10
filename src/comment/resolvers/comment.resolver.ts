import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CommentService } from '../services/comment.service';
import { Comment } from '../models/comment.model';
import { PostService } from '../../post/services/post.service';
import { Post } from '../../post/models/post.model';
import { PaginationArgs } from '../../dto/pagination-args';

@Resolver(() => Comment)
export class CommentResolver {
  constructor(
    private readonly commentService: CommentService,
    private readonly postService: PostService,
  ) {}

  @Query(() => [Comment])
  async findComments(@Args() paginationArgs: PaginationArgs) {
    return this.commentService.find(paginationArgs);
  }

  @Query(() => Comment)
  async findOneCommentById(@Args('_id', { type: () => String }) id: string) {
    return this.commentService.findOneById(id);
  }

  @ResolveField(() => Post)
  async post(@Parent() comment: Comment) {
    return this.postService.findOneById(comment.post_id);
  }
}

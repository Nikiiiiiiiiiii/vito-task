import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';
import { CommentService } from '../../comment/services/comment.service';
import { Comment } from '../../comment/models/comment.model';
import { PaginationArgs } from '../../dto/pagination-args';

@Resolver(() => Post)
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly commentService: CommentService,
  ) {}

  @Query(() => [Post])
  async findPosts(@Args() paginationArgs: PaginationArgs) {
    return this.postService.find(paginationArgs);
  }

  @Query(() => Post)
  async findOnePostById(@Args('_id', { type: () => String }) id: string) {
    return this.postService.findOneById(id);
  }

  @ResolveField(() => [Comment])
  async comments(@Parent() post: Post) {
    return this.commentService.findByPostId(post._id);
  }
}

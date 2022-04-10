import { forwardRef, Module } from '@nestjs/common';
import { PostService } from './services/post.service';
import { PostResolver } from './resolvers/post.resolver';
import { CommentModule } from '../comment/comment.module';

@Module({
  imports: [forwardRef(() => CommentModule)],
  providers: [PostService, PostResolver],
  exports: [PostService],
})
export class PostModule {}

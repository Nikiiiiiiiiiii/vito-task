import { forwardRef, Module } from '@nestjs/common';
import { CommentService } from './services/comment.service';
import { CommentResolver } from './resolvers/comment.resolver';
import { PostModule } from '../post/post.module';

@Module({
  imports: [forwardRef(() => PostModule)],
  providers: [CommentService, CommentResolver],
  exports: [CommentService],
})
export class CommentModule {}

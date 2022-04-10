import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PostService } from 'src/post/services/post.service';
import { DocumentService } from '../../database/services/document.service';
import { Comment } from '../models/comment.model';
import { PaginationArgs } from '../../dto/pagination-args';

@Injectable()
export class CommentService {
  constructor(
    private readonly documentService: DocumentService<Comment>,
    @Inject(forwardRef(() => PostService))
    private readonly postService: PostService,
  ) {}

  async find(paginationArgs: PaginationArgs) {
    const limit = paginationArgs.itemsPerPage;
    const skip = limit * (paginationArgs.page - 1);

    return this.documentService.find({
      selector: {
        type: Comment.name,
      },
      skip,
      limit,
    });
  }

  async findByPostId(post_id: string) {
    return this.documentService.find({
      selector: {
        post_id,
      },
    });
  }

  async findOneById(_id: string) {
    return this.documentService.findOneById(_id);
  }
}

import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Post } from '../models/post.model';
import { DocumentService } from '../../database/services/document.service';
import { CommentService } from 'src/comment/services/comment.service';
import { PaginationArgs } from '../../dto/pagination-args';

@Injectable()
export class PostService {
  constructor(
    private readonly documentService: DocumentService<Post>,
    @Inject(forwardRef(() => CommentService))
    private readonly commentService: CommentService,
  ) {}

  async find(paginationArgs: PaginationArgs) {
    const limit = paginationArgs.itemsPerPage;
    const skip = limit * (paginationArgs.page - 1);

    return this.documentService.find({
      selector: {
        type: Post.name,
      },
      skip,
      limit,
    });
  }

  async findOneById(_id: string) {
    return this.documentService.findOneById(_id);
  }
}

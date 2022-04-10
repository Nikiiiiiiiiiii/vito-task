import { Injectable } from '@nestjs/common';

import { DocumentService } from '../../database/services/document.service';
import { Comment } from '../models/comment.model';
import { PaginationArgs } from '../../dto/pagination-args';
import { paginationUtil } from 'src/utils/pagination.util';

@Injectable()
export class CommentService {
  constructor(private readonly documentService: DocumentService<Comment>) {}

  async find(paginationArgs: PaginationArgs) {
    return this.documentService.find({
      selector: {
        type: Comment.name,
      },
      ...paginationUtil(paginationArgs),
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

import { Injectable } from '@nestjs/common';

import { Post } from '../models/post.model';
import { DocumentService } from '../../database/services/document.service';
import { PaginationArgs } from '../../dto/pagination-args';
import { paginationUtil } from '../../utils/pagination.util';

@Injectable()
export class PostService {
  constructor(private readonly documentService: DocumentService<Post>) {}

  async find(paginationArgs: PaginationArgs) {
    return this.documentService.find({
      selector: {
        type: Post.name,
      },
      ...paginationUtil(paginationArgs),
    });
  }

  async findOneById(_id: string) {
    return this.documentService.findOneById(_id);
  }
}

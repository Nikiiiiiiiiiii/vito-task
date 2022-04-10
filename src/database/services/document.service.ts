import { Inject, Injectable } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';
import { DocumentScope, MangoQuery } from 'nano';
import { DOCUMENT } from '../const/document-provider.const';

@ObjectType()
export class CustomRequiredFields {
  constructor(type: string) {
    this.type = type;
  }

  @Field(() => String)
  readonly type: string;
}

@ObjectType()
export class RequiredFields extends CustomRequiredFields {
  @Field(() => String)
  readonly _id: string;
  @Field(() => String)
  readonly _rev: string;
}

@Injectable()
export class DocumentService<D> {
  private readonly document: DocumentScope<D>;

  constructor(@Inject(DOCUMENT) document: DocumentScope<D>) {
    this.document = document;
  }

  async find(query: MangoQuery) {
    return this.document.find(query).then((response) => response.docs);
  }

  async findOneById(_id: string) {
    return this.document.get(_id);
  }
}

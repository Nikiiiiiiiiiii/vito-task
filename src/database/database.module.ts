import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { DocumentService } from './services/document.service';
import dbConnection from './connection/dbConnection';
import { DOCUMENT } from './const/document-provider.const';

@Global()
@Module({
  providers: [
    {
      provide: DOCUMENT,
      useFactory: dbConnection,
      inject: [ConfigService],
    },
    DocumentService,
  ],
  exports: [DocumentService],
})
export class DatabaseModule {}

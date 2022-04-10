import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { join } from 'path';

import { DatabaseModule } from './database/database.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { config } from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: (configService: ConfigService) => ({
        autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
        playground: configService.get<boolean>('GRAPHQL_PLAYGROUND'),
      }),
      inject: [ConfigService],
    }),
    DatabaseModule,
    PostModule,
    CommentModule,
  ],
})
export class AppModule {}

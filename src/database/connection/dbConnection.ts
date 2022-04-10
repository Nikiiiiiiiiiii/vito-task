import { ConfigService } from '@nestjs/config';

import { join } from 'path';
import { DatabaseScope, DocumentScope } from 'nano';

import * as Nano from 'nano';

import { Post } from '../../post/models/post.model';
import { Comment } from '../../comment/models/comment.model';
import { DatabaseConfig } from '../../config/config';
import { parseJsonFile } from '../../utils/parse-json-file';

export default async (configService: ConfigService) => {
  const { NAME, PROTOCOL, USER, PASSWORD, HOST, PORT } =
    await configService.get<DatabaseConfig>('DATABASE');

  const url = `${PROTOCOL}://${USER}:${PASSWORD}@${HOST}:${PORT}`;

  const nano = Nano(url);

  const currentDbName = NAME;

  // await nano.db.destroy(currentDbName);
  const dbList = await nano.db.list();

  if (!dbList.includes(currentDbName)) {
    await nano.db.create(currentDbName); // Create db if not exists

    await insertInitialData(nano.db, currentDbName);

    await nano.db.use(currentDbName).createIndex({
      index: { fields: ['type'] },
      name: 'type_index',
    });
  }

  return nano.use(currentDbName);
};

const insertInitialData = async (db: DatabaseScope, currentDbName: string) => {
  const posts = await parseJsonFile<Array<Post>>(
    join(process.cwd(), 'database-posts.json'),
  );

  const result = await seedDocuments<Post>(
    db.use<Post>(currentDbName),
    posts.map((post) => new Post({ ...post })),
  );

  result.map(async (el) => {
    const comments = await parseJsonFile<Array<Comment>>(
      join(process.cwd(), 'database-comments.json'),
    );
    await seedDocuments(
      db.use<Comment>(currentDbName),
      comments.map((comment) => new Comment({ ...comment, post_id: el.id })),
    );
  });
};

const seedDocuments = async <D>(document: DocumentScope<D>, docs: Array<D>) => {
  return document.bulk({
    docs,
  });
};

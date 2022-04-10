export const config = (): Config => ({
  GRAPHQL_PLAYGROUND: Boolean(Number(process.env.GRAPHQL_PLAYGROUND)),
  DATABASE: {
    PROTOCOL: process.env.DATABASE_PROTOCOL,
    USER: process.env.DATABASE_USER,
    PASSWORD: process.env.DATABASE_PASSWORD,
    NAME: process.env.DATABASE_NAME,
    HOST: process.env.DATABASE_HOST,
    PORT: process.env.DATABASE_PORT,
  },
});

export interface Config {
  readonly GRAPHQL_PLAYGROUND: boolean;
  DATABASE: Record<keyof DatabaseConfig, string>;
}

export interface DatabaseConfig {
  readonly PROTOCOL: string;
  readonly USER: string;
  readonly PASSWORD: string;
  readonly NAME: string;
  readonly HOST: string;
  readonly PORT: number;
}

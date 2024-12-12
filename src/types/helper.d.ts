export type HASH_PASSWORD = (password: string) => Promise<string>;

export type CHECK_PASSWORD = (
  password: string,
  hash: string
) => Promise<boolean>;


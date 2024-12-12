declare namespace NodeJS{
    interface ProcessEnv{
        PORT: number;
        LOCAL_URL: string;
        JWT_SECRET: string;
        JWT_EXPIRE_TIME: string;
    }
}

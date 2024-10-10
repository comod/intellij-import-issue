import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const POSTGRES_HOST = process.env.POSTGRES_HOST;
const POSTGRES_USER = process.env.POSTGRES_USER;
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
const POSTGRES_DB = process.env.POSTGRES_DB;
const POSTGRES_PORT = parseInt(process.env.POSTGRES_PORT ?? "");
const NEXT_PUBLIC_APP_HOST = process.env.NEXT_PUBLIC_APP_HOST ?? "";

export const env = createEnv({
    /**
     * Specify your server-side environment variables schema here. This way you can ensure the app
     * isn't built with invalid env vars.
     */
    server: {
        POSTGRES_HOST: z.string(),
        POSTGRES_USER: z.string(),
        POSTGRES_PASSWORD: z.string(),
        POSTGRES_DB: z.string(),
        POSTGRES_PORT: z.number(),
        POSTGRESQL_CONNECTION_URI: z.string(),
        SUPERTOKENS_URI: z.string(),
        NODE_ENV: z
            .enum(["development", "test", "production"])
            .default("development"),
    },

    /**
     * Specify your client-side environment variables schema here. This way you can ensure the app
     * isn't built with invalid env vars. To expose them to the client, prefix them with
     * `NEXT_PUBLIC_`.
     */
    client: {
        NEXT_PUBLIC_APP_HOST: z.string(),
        // NEXT_PUBLIC_CLIENTVAR: z.string(),
    },

    /**
     * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
     * middlewares) or client-side so we need to destruct manually.
     */
    runtimeEnv: {
        NEXT_PUBLIC_APP_HOST,

        POSTGRES_HOST,
        POSTGRES_USER,
        POSTGRES_PASSWORD,
        POSTGRES_DB,
        POSTGRES_PORT,

        POSTGRESQL_CONNECTION_URI:
            "postgresql://" +
            POSTGRES_USER +
            ":" +
            POSTGRES_PASSWORD +
            "@postgres:" +
            POSTGRES_PORT +
            "/" +
            POSTGRES_DB,

        SUPERTOKENS_URI: process.env.SUPERTOKENS_URI,

        // DATABASE_URL: process.env.DATABASE_URL,
        NODE_ENV: process.env.NODE_ENV,
        // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
    },
    /**
     * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
     * useful for Docker builds.
     */
    skipValidation: !!process.env.SKIP_ENV_VALIDATION,
    /**
     * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
     * `SOME_VAR=''` will throw an error.
     */
    emptyStringAsUndefined: true,
});

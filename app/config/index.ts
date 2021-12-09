export type EnvType = "development" | "staging" | "production" | "test"

export const NODE_ENV: EnvType = (process.env.NODE_ENV as EnvType) || "development"

export const APP_ENV: EnvType = (process.env.APP_ENV as EnvType) || NODE_ENV

export const APP_NAME = process.env.APP_NAME || "MyTodoApp"

export const APP_ORIGIN = process.env.APP_ORIGIN || process.env.BLITZ_DEV_SERVER_ORIGIN

// Helpers
export const IS_PROD = APP_ENV === "production"
export const IS_DEV = ["development", "staging"].includes(APP_ENV)
export const IS_TEST = process.env.NODE_ENV === "test"
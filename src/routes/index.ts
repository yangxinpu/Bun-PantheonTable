import { Elysia } from "elysia";

export default (app: Elysia) => {
    app.get("/", () => "Hello Elysia with Bun!");

    
    return app;
}

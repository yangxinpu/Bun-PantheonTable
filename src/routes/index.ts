import { Elysia } from "elysia";
import { join } from "bun:path";
import users from "./users/users";


export default (app: Elysia) => {
    app.get("/", () => new Response(Bun.file(join(__dirname, "../../pages/users.html"))));
    // 用户路由组
    app.group("/users", users);
    return app;
}

import { Elysia } from "elysia";
import { join } from "bun:path";

// 路由组
import users from "./users/users";
import login from "./login/login";


export default (app: Elysia) => {
    app.get("/", () => new Response(Bun.file(join(__dirname, "../../pages/users.html"))));
    // 用户路由组
    app.group("/users", users);
    // 登录注册路由组
    app.group("/login", login);
    return app;
}

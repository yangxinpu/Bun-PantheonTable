import { Elysia } from "elysia";

//引入内置模块
import os from "bun:os";

// 引入插件或工具
import cors from "@elysiajs/cors";
import logger from "./libs/utils/logger";
import jwt from "@elysiajs/jwt";


// 引入路由
import router from "./routes";


const hostname = os.networkInterfaces().WLAN[1].address;
const port = 3000;

const app = new Elysia();
app.use(cors());
app.use(jwt({
    name: "jwt",
    secret: Bun.env.JWT_SECRET || "PantheonTable",
    exp: "7d",
}));

//app.use(logger);

app.use(router);



app.listen({
    hostname: hostname,
    port: port,
},()=>{
    console.log(`🚀🚀🚀 \x1b[35mPantheonTable\x1b[0m 服务器运行在 \x1b[36mhttp://${hostname}:${port}\x1b[0m`);
    console.log(`📊  当前主机Ipv4: \x1b[32m${hostname}\x1b[0m`);
});
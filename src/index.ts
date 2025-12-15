import { Elysia } from "elysia";

//引入内置模块
import os from "bun:os";

// 引入插件或工具
import cors from "@elysiajs/cors";
import logger from "./libs/utils/logger";

// 引入路由
import router from "./routes";


const hostname = os.networkInterfaces().WLAN[1].address;
const port = 3000;

const app = new Elysia();
app.use(cors());

app.use(logger);

app.use(router);



app.listen({
    hostname: hostname,
    port: port,
},()=>{
    console.log(`🚀🚀🚀 PantheonTable 服务器运行在 http://${hostname}:${port}`);
});
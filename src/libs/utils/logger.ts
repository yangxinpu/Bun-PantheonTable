import { Elysia } from "elysia";

export default (app: Elysia) => {
    let count = 0;

    app.onBeforeHandle(({ request }) => {
        const id = ++count;
        const url = new URL(request.url);

        const method = request.method;
        const path = url.pathname;
        const query = url.search || "无";

        const ip =
            request.headers.get("x-forwarded-for") ||
            request.headers.get("x-real-ip") ||
            "未知IP";

        const ua = request.headers.get("user-agent") || "未知UA";
        const contentType = request.headers.get("content-type") || "无";

        const time = new Date().toLocaleString("zh-CN", {
            hour12: false,
        });

        console.log(`
📥【请求开始】
├─ 请求序号：${id}
├─ 时间：${time}
├─ 方法：${method}
├─ 路径：${path}
├─ 查询参数：${query}
├─ IP：${ip}
├─ Content-Type：${contentType}
└─ User-Agent：${ua}
        `.trim());
    });
    
    app.onError(({ request, error }) => {
        const url = new URL(request.url);
        const time = new Date().toLocaleString("zh-CN", {
            hour12: false,
        });
        const ip =
            request.headers.get("x-forwarded-for") ||
            request.headers.get("x-real-ip") ||
            "未知IP";

        console.error(`
    ❌【请求错误】
    ├─ 时间：${time}
    ├─ 方法：${request.method}
    ├─ 路径：${url.pathname}
    ├─ IP：${ip}
    └─ 错误信息：${error}
        `.trim());
    });
    return app;
};

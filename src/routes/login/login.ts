import { createtUser, queryUserForLogin } from "../../libs/db/users/users";


export default (group: any) => {
    group.post("/", async ({body, set,jwt}: {body: any, set: any, jwt: any}) => {
        try {
            // 验证用户名或邮箱是否为空
            if (!body.username && !body.email) {
                return {
                    code: 400,
                    message: "用户名或邮箱不能为空",
                    ok: false,
                };
            }
            const result = await queryUserForLogin(body);
            //如果用户不存在，需要注册
            if (!result || result.length === 0) {
                const newUser = {
                    ...body,
                    avatar: body.avatar || "",
                    total_games: 0,
                    win_rate: 0,
                    last_login_time: new Date().toISOString(),
                    last_login_ip: set?.ip || "127.0.0.1",
                    status: 0
                };
                
                await createtUser(newUser);
                // 生成JWT token
                const token = jwt.sign({ id: newUser.id });

                return {
                    code: 200,
                    message: "用户注册成功",
                    tokent: token,
                    ok: true,
                };
            }

            //查询用户成功，代表登录成功
            const token = jwt.sign({ id: result[0]!.id });
            return {
                code: 200,
                message: "登录成功",
                ok: true,
                tokent: token,
                data: result[0]!.id,
            };
        } catch (error) {
            console.error("登录或注册失败:", error);
            return {
                code: 500,
                message: "登录或注册失败",
                ok: false,
            };
        }
    });
    return group;
}
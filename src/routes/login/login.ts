import { createtUser, queryUserForLogin } from "../../libs/db/users/users";
import { mkdirSync } from "fs";
import { join } from "path";
import crypto from "crypto";

export default (group: any) => {
    group.post("/", async ({ body, set, jwt }: any) => {
        try {
            let username = "";
            let email = "";
            let avatarUrl = "";
            // 处理请求数据
            if (body) {
                username = (body.username as string) ?? "";
                email = (body.email as string) ?? "";

                const avatar = body.avatar as File | null;
                
                if (avatar && avatar.size > 0) {
                if (!avatar.type.startsWith("image/")) {
                    return { code: 400, message: "头像必须是图片", ok: false };
                }

                const uploadDir = join(process.cwd(), "uploads/avatars");
                mkdirSync(uploadDir, { recursive: true });

                const ext = avatar.name.split(".").pop();
                const filename = `${crypto.randomUUID()}.${ext}`;
                const filepath = join(uploadDir, filename);

                const buffer = Buffer.from(await avatar.arrayBuffer());
                await Bun.write(filepath, buffer);
                avatarUrl = `/avatars/${filename}`;
                } else if (typeof body.avatar === "string") {
                    // 处理JSON请求中的头像URL
                    avatarUrl = body.avatar;
                }
            }
            if (!username && !email) {
                return { code: 400, message: "用户名或邮箱不能为空", ok: false };
            }
            
            // 查看是否存在用户，不存在则注册
            const users = await queryUserForLogin({ username, email });

            // 注册
            if (!users || users.length === 0) {
                await createtUser({
                    username,
                    email,
                    avatar: avatarUrl,
                    total_games: 0,
                    win_rate: 0,
                    last_login_time: new Date().toISOString(),
                    last_login_ip: set.ip ?? "127.0.0.1",
                    status: 0,
                });

                const user = await queryUserForLogin({ username, email });
                const token = jwt.sign({ id: user![0]!.id });
                return {
                    code: 200,
                    message: "注册成功",
                    ok: true,
                    token,
                    data: {
                        id: user![0]!.id,
                        avatarUrl: user![0]!.avatar
                    }
                };
            }
            // 登录
            const token = await jwt.sign({ id: users![0]!.id });
            return {
                code: 200,
                message: "登录成功",
                ok: true, token,
                data: {
                    id: users![0]!.id,
                    avatarUrl: users![0]!.avatar
                }
            };
        } catch (err) {
            console.error("登录/注册失败:", err);
            return {
                code: 500,
                message: "服务器错误",
                ok: false
            };
        }
    });

    return group;
};
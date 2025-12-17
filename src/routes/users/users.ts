import { queryUserById, updateUser } from "../../libs/db/users/users";
import type { User } from "../../libs/db/users/users";


export default (group: any) => {
    const verifyJWT = async ({ request, jwt, set }: any) => {
        const authHeader = request.headers.get("Authorization");
        if (!authHeader) {
            set.status = 401;
            return {
                code: 401,
                message: "未提供授权令牌",
                ok: false
            };
        }

        const token = authHeader.replace("Bearer ", "");
        try {
            const decoded = await jwt.verify(token);
            if (!decoded) {
                set.status = 401;
                return {
                    code: 401,
                    message: "无效的授权令牌",
                    ok: false
                };
            }
            return { user: decoded };
        } catch (error) {
            set.status = 401;
            return {
                code: 401,
                message: "授权令牌验证失败",
                ok: false
            };
        }
    };

    group.get("/queryById", verifyJWT, async ({ url, user }: { url: string, user: any }) => {
        const searchParams = new URL(url).searchParams;
        try {
            const result = await queryUserById(Number(searchParams.get("id")) || 0);
            return {
                code: 200,
                message: "查询成功",
                ok: true,
                data: result,
            };
        } catch (error) {
            return {
                code: 500,
                message: "查询失败",
                ok: false,
                data: error,
            };
        }
    });
    group.post("/update", verifyJWT, async ({body, user}: {body: User, user: any}) => {
        try {
            await updateUser(body);
            return {
                code: 200,
                message: "更新成功",
                ok: true,
            };
        } catch (error) {
            return {
                code: 500,
                message: "更新失败",
                ok: false,
            };
        }
    });
    return group;
}
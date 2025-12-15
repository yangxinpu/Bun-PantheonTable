import { queryUsers, createtUser, updateUser } from "../../libs/db/users/users";
import type { User } from "../../libs/db/users/users";


export default (group: any) => {
    group.get("/query", async ({ url }: { url: string }) => {
        throw new Error("查询参数错误");
        const searchParams = new URL(url).searchParams;
        try {
            const result = await queryUsers({
                id: Number(searchParams.get("id")) || 0,
                username: searchParams.get("username") || "",
                email: searchParams.get("email") || "",
            });
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
    group.post("/create", async ({body}: {body: User}) => {
        try {
            await createtUser(body);
            return {
                code: 200,
                message: "创建成功",
                ok: true,
            };
        } catch (error) {
            return {
                code: 500,
                message: "创建失败",
                ok: false
            };
        }
    });
    group.post("/update", async ({body}: {body: User}) => {
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
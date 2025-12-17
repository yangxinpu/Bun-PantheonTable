import pool from "../index";

//用户类型
export interface User {
    id: number;
    username: string;
    email: string;
    avatar: string;
    total_games: number;
    win_rate: number;
    last_login_time: string;
    last_login_ip: string;
    status: number;
}

//根据id查询用户
export const queryUserById = async (id: number) => {
    try {
        const [rows] = await pool.execute("SELECT * FROM users WHERE id = ?", [id]);
        return rows;
    } catch (error) {
        throw error;
    }
}

//根据用户名或邮箱查询用户
export const queryUserForLogin = async (params: { username?: string, email?: string }): Promise<User[] | null> => {
    try {
        const [rows] = await pool.execute("SELECT * FROM users WHERE username = ? OR email = ?", [params.username, params.email]);
        return rows as User[] | null;
    } catch (error) {
        throw error;
    }
}

//创建用户
export const createtUser = async (params:User) => {
    try { 
        // 转换ISO时间格式为MySQL兼容的datetime格式
        const loginTime = new Date(params.last_login_time);
        const formattedLoginTime = loginTime.toISOString().slice(0, 19).replace('T', ' ');
        
        const [rows] = await pool.execute(
            "INSERT INTO users (username, email, avatar, last_login_time, last_login_ip) VALUES (?, ?, ?, ?, ?)", 
            [params.username, params.email, params.avatar, formattedLoginTime, params.last_login_ip]
        );
        return rows;
    } catch (error) {
        throw error;
    }
}

//更新用户信息
export const updateUser = async (params:User) => {
    try { 
        // 转换ISO时间格式为MySQL兼容的datetime格式
        const loginTime = new Date(params.last_login_time);
        const formattedLoginTime = loginTime.toISOString().slice(0, 19).replace('T', ' ');
        
        const [rows] = await pool.execute(
            "UPDATE users SET username = ?, email = ?, avatar = ?, last_login_time = ?, last_login_ip = ?, status = ? WHERE id = ?", 
            [params.username, params.email, params.avatar, formattedLoginTime, params.last_login_ip, params.status, params.id]
        );
        return rows;
    } catch (error) {
        throw error;
    }
}

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


export const queryUsers = async (params: { id?: number, username?: string, email?: string }) => {
    try {
        if (!params.id && !params.username && !params.email) {
            const [rows] = await pool.execute("SELECT * FROM users");
            return rows;
        } else {
            console.log(params.id, params.username, params.email);
            const [rows] = await pool.execute("SELECT * FROM users WHERE id = ? OR username = ? OR email = ?", [params.id, params.username, params.email]);
            return rows;
        }
    } catch (error) {
        throw error;
    } 
}

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

import { api } from "@/shared/api/axiosInstance";
import { User, UserUpdateDto } from "../model/user.dto";

interface PointsDto {
    points: number;
}

export interface IUserRepo {
    getAll(): Promise<User[]>;
    getById(id: string): Promise<User>;
    getProfile(): Promise<User>;
    addPoints(id: string, req: PointsDto): Promise<void>;
    update(id: string, req: UserUpdateDto): Promise<User>;
    delete(id: string): Promise<void>;
}

class AxiosUserApi implements IUserRepo {
    async getAll(): Promise<User[]> {
        const res = await api.get<User[]>("/users");
        return res.data;
    }
    async getById(id: string): Promise<User> {
        const res = await api.get<User>(`/users/${id}`);
        return res.data;
    }
    async getProfile(): Promise<User> {
        const res = await api.get<User>("/users/profile");
        return res.data;
    }
    async addPoints(id: string, req: PointsDto): Promise<void> {
        await api.post(`/users/${id}/points`, req);
    }
    async update(id: string, req: UserUpdateDto): Promise<User> {
        const res = await api.put<User>(`/users/${id}`, req);
        return res.data;
    }
    async delete(id: string): Promise<void> {
        await api.delete(`/users/${id}`);
    }
}

export const userRepo: IUserRepo = new AxiosUserApi();
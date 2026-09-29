import { apiFetch } from "./api";
import type { User } from "../types/auth";

interface LoginData {
    email: string;
    password: string;
}

interface RegisterData {
    name: string;
    email: string;
    password: string;
}

export async function registerUser(data: RegisterData): Promise<User> {
    return apiFetch("/users", {
        method: "POST",
        body: JSON.stringify(data)
    });
}

export async function loginUser(data: LoginData): Promise<User> {
    return apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(data)
    });
}

export async function logoutUser(): Promise<void> {
    await apiFetch("/auth/logout", {
        method: "POST"
    });
}
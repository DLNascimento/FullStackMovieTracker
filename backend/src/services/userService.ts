import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";

export async function createUserService(name: string, email: string, password: string) {

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });
    return user;
}

export async function getUsersService() {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    return users;
}
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
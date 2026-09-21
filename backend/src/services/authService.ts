import bcrypt from "bcrypt";
import {prisma} from "../lib/prisma.js";

export async function loginUser(email: string, password: string){


    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if(!user){
        throw new Error("Invalid credentials");
    }

    const passwordMatches = await bcrypt.compare(
        password,
        user.password
    );

    if(!passwordMatches){
        throw new Error("Invalid credentials");
    }

    return user;

}
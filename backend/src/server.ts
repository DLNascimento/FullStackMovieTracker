import "dotenv/config";
import  express  from "express";
import { prisma } from "../src/lib/prisma.js"
import bcrypt from "bcrypt";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({message: "API is running"})
})


app.post("/users", async (req, res) => {

    const {name, email, password} = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
       data: {
        name,
        email,
        password: hashedPassword
       }
    });

    res.status(201).json(user);
})


app.listen(3000, () => { console.log("Server running on port 3000");
 });
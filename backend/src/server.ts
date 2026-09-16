import "dotenv/config";
import  express  from "express";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({message: "API is running"})
})

app.use("/users", userRoutes);

app.listen(3000, () => { console.log("Server running on port 3000");
 });
import "dotenv/config";
import  express  from "express";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({message: "API is running"})
})

app.use("/users", userRoutes);

app.use(errorHandler);

app.listen(3000, () => { console.log("Server running on port 3000");
 });
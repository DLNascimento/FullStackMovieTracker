import "dotenv/config";
import  express  from "express";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({message: "API is running"})
})

app.use(cookieParser());

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/test", testRoutes);
app.use("/movies", movieRoutes);

app.use(errorHandler);

app.listen(3000, () => { console.log("Server running on port 3000");
 });
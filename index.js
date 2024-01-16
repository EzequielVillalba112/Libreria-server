import express, { json } from "express";
import { corsMiddleware } from "./middlewares/cors.js";
import bookRoutes from "./routes/book.routes.js"

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(json());
app.use(corsMiddleware());
app.disable("x-powered-by");

app.use("/db", bookRoutes);

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});

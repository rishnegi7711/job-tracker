import { env } from "./env";
import authRouter from "./routes/auth";
import express = require("express");
import cors = require("cors");
import protect from "./middleware/protect";
import applicationRouter from "./routes/applications";

const app = express();
const PORT = env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      const allowed = [env.FRONTEND_URL, "http://localhost:5173"].filter(
        Boolean,
      );
      if (!origin || allowed.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  }),
);

app.use("/api/auth", authRouter);
app.use("/api/applications", applicationRouter);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

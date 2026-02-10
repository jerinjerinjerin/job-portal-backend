import  express from 'express';


import userRoutes from "./modules/user/user.route";
import profileRoutes from "./modules/profile/profile.route";
import jobRoutes from "./modules/job/job.route";
import { errorHandler } from './commen/middlewares/error.middleware';

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));



app.get('/', (req: express.Request, res: express.Response) => {
  res.send('health check!');
});

app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/jobs", jobRoutes);

app.use(errorHandler);


export default app;
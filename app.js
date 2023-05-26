import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import petRoutes from './pets/routes/pets.routes.js';

/* Config the path so the app can use the enviroment variables */
dotenv.config({ path: './pets/config/config.env' });

const app = express();
const port = process.env.PORT;

/* Global middlewares */
app.use(cors());
app.use(express.json());

/* Routes */
app.use('/pets', petRoutes);

/* Server setup */
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () =>
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
  );
}

export default app;

import 'dotenv/config';
import 'module-alias/register';
import App from './app';
import validateEnv from '@/helpers/validateEnv';
import PostRoute from '@/routes/post.route';
import UserRoute from '@/routes/user.route';

validateEnv();

const app = new App(
  [new PostRoute(), new UserRoute()],
  Number(process.env.PORT)
);

app.listen();

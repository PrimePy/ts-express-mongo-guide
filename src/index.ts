import dotenv from 'dotenv';
import App from './app';

import { routers } from './router';

dotenv.config();

const app = new App( routers );
 
app.listen();



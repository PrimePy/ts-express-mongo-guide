import App from './app';

import { routers } from './router';

const app = new App( routers , 5000);
 
app.listen();



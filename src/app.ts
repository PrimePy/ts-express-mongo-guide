import express, {Application, Router} from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import errorMiddleware from './middlewares/error.middleware';
import cors from 'cors';


class App{

	public app: Application;

	constructor(routers: any){
		this.app = express();

		( async()=> {
			await this.initializeDatabase().then(()=> console.log('DB Connected'));
		})();
		
		this.initializeMiddlewares();
		this.initializeRouters(routers);
	}

	private initializeMiddlewares() {
		this.app.use(bodyParser.json());
		this.app.use(cookieParser());
		this.app.use(cors());
		this.app.use(errorMiddleware);
	}

	private initializeRouters(routers: any){
		routers.forEach((router: any) => {
			this.app.use('/', router);
		});
	}

	private async initializeDatabase() {
    	const {
      		MONGO_USER,
      		MONGO_PASSWORD,
      		MONGO_DATABASE,
    	} = process.env;

    	await mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@primz0.vz97p.mongodb.net/${MONGO_DATABASE}?retryWrites=true&w=majority`, 
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useCreateIndex: true,
				useFindAndModify: false
			}
		);
	}

	public listen(){
		this.app.listen(process.env.PORT, () => {
      		console.log(`App listening on the port ${process.env.PORT}`);
    	});
	}

}

export default App;

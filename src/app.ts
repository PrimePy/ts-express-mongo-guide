import express, {Application, Router} from 'express';
import bodyParser from 'body-parser';


class App{

	public app: Application;
	public port: number;

	constructor(routers: any, port: number){
		this.app = express();
		this.port = port;

		this.initializeMiddlewares();
		this.initializeRouters(routers);
	}

	private initializeMiddlewares() {
		this.app.use(bodyParser.json());
	}

	private initializeRouters(routers: any){
		routers.forEach((router: any) => {
			this.app.use('/', router);
		});
	}

	public listen(){
		this.app.listen(this.port, () => {
      		console.log(`App listening on the port ${this.port}`);
    	});
	}

}

export default App;

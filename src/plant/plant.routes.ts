import { Router } from 'express';
import PlantController from './plant.controller';

class PlantRoutes{

	public path = '/plant'
	public router = Router();
	public controller = new PlantController();

	constructor(){
		this.initializeRoutes();
	}

	public initializeRoutes(){
		this.router.get(this.path, this.controller.getPlants);
		this.router.post(this.path, this.controller.createPlant);
	}
}

export default PlantRoutes;
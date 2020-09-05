import { Router } from 'express';
import PlantBusiness from './plant.business';
import Routes from '../interfaces/routes.interface';
import PlantDto from './plant.dto';
import validationMiddleware from '../middlewares/validation.middleware';

class PlantRoute implements Routes{

	public path: string = '/plants';
	public router: Router = Router();
	public business: PlantBusiness = new PlantBusiness();

	constructor(){
		this.initializeRoutes();
	}

	private initializeRoutes(){
		this.router.get(this.path, this.business.getAllPlants);
		this.router.get(this.path+ '/:id', this.business.getPlantById);
		this.router.post(this.path, validationMiddleware(PlantDto), this.business.createPlant);
		this.router.patch(this.path+ '/:id', validationMiddleware(PlantDto, true), this.business.updatePlant);
		this.router.delete(this.path+ '/:id', this.business.deletePlant);
	} 

}

export default PlantRoute;
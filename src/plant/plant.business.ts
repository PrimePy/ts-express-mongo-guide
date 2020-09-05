import { Request, Response, NextFunction} from 'express';
import Plant from './plant.interface';
import plantModel from './plant.model';
import PlantNotFoundException from '../exceptions/PlantNotFoundException';


class PlantBusiness {

	public getAllPlants = async (req: Request, res: Response) => {
		const plants = await plantModel.find();
		res.send(plants);
	}

	public getPlantById = async (req: Request, res: Response, next: NextFunction) => {
		const plantId = req.params.id;
		const plant = await plantModel.findById(plantId);
		plant ?  res.send(plant): next( new PlantNotFoundException(plantId));
		
	}

	public createPlant = async (req: Request, res: Response) => {
		const plant: Plant = req.body;
		const createPlant = new plantModel(plant);
		const savedPlant = await createPlant.save();
		res.send(savedPlant);
	}

	public updatePlant = async (req: Request, res: Response, next: NextFunction) => {
		const plantId = req.params.id;
		const plant: Plant = req.body;
		const updatePlant = await plantModel.findByIdAndUpdate(plantId, plant, { new: true});
		updatePlant ?  res.send(updatePlant): next( new PlantNotFoundException(plantId));
	}

	public deletePlant = async (req: Request, res: Response, next: NextFunction) => {
		const plantId = req.params.id;
		const deleteStatus = await plantModel.findByIdAndDelete(plantId);
		deleteStatus ?  res.send(200): next( new PlantNotFoundException(plantId));
	}

}

export default PlantBusiness;
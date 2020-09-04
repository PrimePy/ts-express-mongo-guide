import { Request, Response } from 'express';
import Plant from './plant.interface';
import plantModel from './plant.model';


class PlantBusiness {

	public getAllPlants = async (req: Request, res: Response) => {
		const plants = await plantModel.find();
		res.send(plants);
	}

	public getPlantById = async (req: Request, res: Response) => {
		const plantId = req.params.id;
		const plant = await plantModel.findById(plantId);
		res.send(plant);
	}

	public createPlant = async (req: Request, res: Response) => {
		const plant: Plant = req.body;
		const createPlant = new plantModel(plant);
		const savedPlant = await createPlant.save();
		res.send(savedPlant);
	}

	public updatePlant = async (req: Request, res: Response) => {
		const plantId = req.params.id;
		const plant: Plant = req.body;
		const updatePlant = await plantModel.findByIdAndUpdate(plantId, plant, { new: true});
		res.send(updatePlant);
	}

	public deletePlant = async (req: Request, res: Response) => {
		const plantId = req.params.id;
		const deleteStatus = await plantModel.findByIdAndDelete(plantId);
		return deleteStatus ?  res.send(200):  res.send(404);
	}

}

export default PlantBusiness;
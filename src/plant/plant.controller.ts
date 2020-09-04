import { Request, Response } from 'express';
import Plant from './plant.interface';


class PlantController {

	private plants: Array<Plant> = [
		{
			name: 'rose',
			category: 'flower',
			price: 100.0,
			avatar: 'rose.png',
			description: 'Beautiful flower'
		},
		{
			name: 'sun flower',
			category: 'flower',
			price: 100.0,
			avatar: 'sun_flower.png',
			description: 'Beautiful flower'
		},
	]

	public getPlants = (req: Request, res: Response) => {
		res.send(this.plants);
	}

	public createPlant = (req: Request, res: Response) => {
		const plant : Plant = req.body;
		this.plants.push(plant);
		res.send(plant);
	}
}

export default PlantController;
import HttpException from './HttpException';

class PlantNotFoundException extends HttpException{
	
	constructor(id: string){
		super( 404, `Plant with id ${id} not found`);
	}

}

export default PlantNotFoundException;
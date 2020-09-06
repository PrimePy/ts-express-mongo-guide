import { IsInt, IsString, IsMongoId } from 'class-validator';

class PlantDto {

	@IsString()
	public name: string;

	@IsString()
	public category: string;

	@IsInt()
	public price: number;

	@IsString()
	public description: string;

	@IsMongoId()
	public userId: any;

	@IsString()
	public avatar: string;

}

export default PlantDto;
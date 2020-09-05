import { IsInt, IsString } from 'class-validator';

class PlantDto {

	@IsString()
	public name: string;

	@IsString()
	public category: string;

	@IsInt()
	public price: number;

	@IsString()
	public description: string;

	@IsString()
	public avatar: string;

}

export default PlantDto;
import { IsString , Length, IsEmail} from 'class-validator';

class UserSignInDto{

	@IsEmail()
	public email: string;

	@Length(8, 32)
	@IsString()
	public password: string;
}


export default UserSignInDto;
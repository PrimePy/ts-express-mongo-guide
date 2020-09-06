import {IsString , Length, IsEmail} from 'class-validator';

class UserSignUpDto{

	@IsString()
	@Length(4, 10)
	public username: string;

	@IsEmail()
	public email: string;

	@IsString()
	public role: string;

	@Length(8, 32)
	@IsString()
	public password: string;
}


export default UserSignUpDto;
import { Request, Response, NextFunction} from 'express';
import bcrypt from 'bcrypt';
import UserSignInDto from './user.signin.dto';
import UserSignUpDto from './user.signup.dto';
import userModel from './user.model';
import UserWithThatEmailAlreadyExistsException from '../exceptions/UserWithThatEmailAlreadyExistsException';
import WrongCredentialsException from '../exceptions/WrongCredentialsException';
import jwt from 'jsonwebtoken';
import Token from '../interfaces/token.interface';
import TokenPayload from '../interfaces/token.payload.interface';
import User from './user.interface';

class UserBusiness{

	public signIn = async(req: Request, res: Response, next: NextFunction) => {
		const userData: UserSignInDto = req.body;
		const user = await userModel.findOne({email: userData.email});
		if(user){
			const passwordCheck  = await this.validatePassword(user.password, userData.password);
			if(passwordCheck){
				const payload: Token = this.createToken(user);
				res.setHeader('Set-Cookie', [this.createCookie(payload)]);
				res.send(user);
			}else{
				next(new WrongCredentialsException());
			}
		}else{
			next(new WrongCredentialsException());
		}
	}

	public signUp = async(req: Request, res: Response, next: NextFunction) => {
		const userData: UserSignUpDto = req.body;
		const availableCheck = await userModel.findOne({email: userData.email});
		if(availableCheck){
			next(new UserWithThatEmailAlreadyExistsException(userData.email));
		}else{
			const encryptedPassword = await this.encryptPassword(userData.password);
			const user = await userModel.create({
				...userData,
				password: encryptedPassword
			});
			const payload: Token = this.createToken(user);
			res.setHeader('Set-Cookie', [this.createCookie(payload)]);
			res.send(user);
		}
	} 

	public signOut = (req: Request, res: Response, next: NextFunction) => {;
		res.setHeader('Set-Cookie', ['Authorization=;Path=/;Max-age=0']);
  		res.send(200);
	}  


	private encryptPassword = async (password: string): Promise<string> => {
		const salt = await bcrypt.genSalt(10);
		return bcrypt.hash(password, salt);
	};

	private validatePassword = async (ecryptPassword: string, password: string): Promise<boolean> => {
		return await bcrypt.compare(password, ecryptPassword);
	};

	private createToken = (user: User): Token => {
		const expiresIn: number = 60*5;
		const secretKey: string = process.env.SECRET_KEY || 'TestToken' ;
		const payload: TokenPayload = {
			_id: user._id
		} 
		return { expiresIn, token: jwt.sign(payload, secretKey, { expiresIn }) };
	};

	private createCookie = (payload: Token) => {
		return `Authorization=${payload.token}; HttpOnly; Path=/; Max-Age=${payload.expiresIn}`;
	}
}

export default UserBusiness;
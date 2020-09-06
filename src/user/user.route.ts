import { Router } from 'express';
import Routes from '../interfaces/routes.interface';
import UserBusiness from './user.business';
import validationMiddleware from '../middlewares/validation.middleware';
import UserSignInDto from './user.signin.dto';
import UserSignUpDto from './user.signup.dto';

class UserRoute implements Routes{

	public path: string = '/user';
	public router: Router = Router();
	public business: UserBusiness = new UserBusiness();

	constructor(){
		this.initializeRoutes();
	}

	private initializeRoutes(){
		this.router.post(`${this.path}/signup`, validationMiddleware(UserSignUpDto), this.business.signUp);
		this.router.post(`${this.path}/signin`, validationMiddleware(UserSignInDto), this.business.signIn);
		this.router.post(`${this.path}/signout`, this.business.signOut);
	}
}

export default UserRoute;


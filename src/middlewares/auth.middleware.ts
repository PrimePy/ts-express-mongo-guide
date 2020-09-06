import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import userModel from '../user/user.model';
import RequestPayload from '../interfaces/request.payload.interface';
import TokenPayload from '../interfaces/token.payload.interface';
import WrongAuthenticationTokenException from '../exceptions/WrongAuthenticationTokenException';
import AuthenticationTokenMissingException from '../exceptions/AuthenticationTokenMissingException';

const authMiddleware = async (req: Request , res: Response, next: NextFunction) => {
	const cookies = req.cookies;
	const requestPayload: RequestPayload = req as RequestPayload;
	if(cookies && cookies.Authorization){
		const secretKey: string = process.env.SECRET_KEY || 'TestToken';
		try{
			const tokenPayload: TokenPayload = jwt.verify(cookies.Authorization, secretKey) as TokenPayload;
			const user = await  userModel.findOne({ _id: tokenPayload._id });
			if(user){
				requestPayload.user = user;
				next();
			}else{
				next(new WrongAuthenticationTokenException());
			}
		}catch(error){
			next(new WrongAuthenticationTokenException());
		}
	}else{
		next(new AuthenticationTokenMissingException());
	}
}

export default authMiddleware;
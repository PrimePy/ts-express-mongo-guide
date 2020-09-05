import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import HttpException from '../exceptions/HttpException';

const validationMiddleware = <T>(type: any, skipMissingProperties = false): RequestHandler => {
	return async (req, res, next) => {
		const errors: ValidationError[] = await validate(plainToClass(type, req.body), { skipMissingProperties});
		if(errors.length  > 0){
			const messages: any[] = errors.map((error: ValidationError) => error.constraints);
			const message = messages.map((msg) => Object.values(msg)).join(', ');
			next(new HttpException(400, message));
		}else{
			next();
		}
	}
}

export default validationMiddleware;
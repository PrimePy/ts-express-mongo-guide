import HttpException from './HttpException';

class AuthenticationTokenMissingException extends HttpException{
	
	constructor(){
		super( 404, 'Authentication token missing');
	}

}

export default AuthenticationTokenMissingException;
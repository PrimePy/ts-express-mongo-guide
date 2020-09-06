import HttpException from './HttpException';

class WrongAuthenticationTokenException extends HttpException{
	
	constructor(){
		super( 404, 'Wrong authentication token');
	}

}

export default WrongAuthenticationTokenException;
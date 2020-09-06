import HttpException from './HttpException';

class WrongCredentialsException extends HttpException{
	
	constructor(){
		super( 404, 'Wrong user credential');
	}

}

export default WrongCredentialsException;
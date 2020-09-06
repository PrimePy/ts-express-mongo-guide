import { Request } from 'express';
import User from '../user/user.interface';

interface RequestPayload extends Request{
	user: User;
}

export default RequestPayload;
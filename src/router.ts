
import PlantRoute from './plant/plant.route';
import UserRoute from './user/user.route';

export const routers: Array<any> = [
	new PlantRoute().router,
	new UserRoute().router
];


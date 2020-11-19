import EndGame from './pages/EndGame';
import StartGame from './pages/StartGame';
import Error404 from './pages/Error404';

const routes = {
	'/': StartGame(),
	'/home': StartGame(),
	'/end': EndGame(),
	'/404': Error404(),
};

const renderHTML = (el, route) => {
	el.innerHTML = route;
};

const getHashRoute = () => {
	const route = Object.keys(routes).find(
		(r) => r.replace('/', '') === window.location.hash.replace('#', '')
	);

	return route ? routes[route] : routes['/404'];
};

export const initialRoutes = (el) => {
	renderHTML(el, routes['/']);
	window.addEventListener('hashchange', () => {
		renderHTML(el, getHashRoute());
	});
};

export const hashRouterPush = (el) => {
	renderHTML(el, getHashRoute());
};

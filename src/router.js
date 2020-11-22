import EndGamePage from './pages/EndGamePage';
import StartGamePage from './pages/StartGamePage';
import Error404Page from './pages/Error404Page';

const routes = {
	'/': StartGamePage(),
	'/done': EndGamePage(),
	'/404': Error404Page(),
};

const renderHTML = (el, route) => {
	el.innerHTML = '';
	el.appendChild(route.render());
};

const getHashRoute = () => {
	const route = Object.keys(routes).find(
		(r) => r.replace('/', '') === window.location.hash.replace('#', '')
	);

	return route ? routes[route] : routes['/404'];
};

export const initialRoutes = (el) => {
	renderHTML(el, getHashRoute());
	window.addEventListener('hashchange', () => {
		renderHTML(el, getHashRoute());
	});
};

export const hashRouterPush = (el) => {
	renderHTML(el, getHashRoute());
};

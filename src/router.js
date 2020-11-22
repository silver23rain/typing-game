import EndGamePage from './pages/EndGamePage';
import StartGamePage from './pages/StartGamePage';
import Error404Page from './pages/Error404Page';

const routes = {
	'/': StartGamePage(),
	'/done': EndGamePage(),
	'/404': Error404Page(),
};

const renderHTML = (route) => {
	const app = document.getElementById('app');
	app.innerHTML = '';
	app.appendChild(route.render());

	const links = document.querySelectorAll('a[route]');
	if (links) {
		[...links].forEach((link) => {
			link.addEventListener('click', (e) => {
				const path = e.currentTarget.getAttribute('route');
				historyRouterPush(path);
			});
		});
	}
};

export const initialRoutes = () => {
	renderHTML(getPath());
	window.onpopstate = () => renderHTML(getPath());
};

const getPath = () => routes[window.location.pathname];

function historyRouterPush(pathName) {
	history.pushState({}, pathName, window.location.origin + pathName);
	renderHTML(routes[pathName]);
}

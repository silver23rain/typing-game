import { hashRouterPush, initialRoutes } from './router';
import './styles/main.css';

window.addEventListener('DOMContentLoaded', () => {
	const main = document.getElementById('main');

	initialRoutes(main);

	const hashLinker = document.querySelectorAll('a.route');
	hashLinker.forEach((el) => {
		el.addEventListener('click', () => {
			hashRouterPush(main);
		});
	});
});

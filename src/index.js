import { initialRoutes } from './router';
import './styles/app.css';

window.addEventListener('DOMContentLoaded', () => {
	const app = document.getElementById('app');

	initialRoutes(app);
});

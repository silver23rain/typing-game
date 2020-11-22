import { createElement } from '../common';

const EndGamePage = () => {
	const render = () => {
		const div = createElement('div');
		div.textContent = 'end';
		return div;
	};
	return {
		render,
	};
};

export default EndGamePage;

import { createElement } from '../common';

const StartGameButton = (start, setStart) => {
	const render = () => {
		const gameStartBtn = createElement('button', { id: 'game_btn' });
		gameStartBtn.addEventListener('click', setStart);
		gameStartBtn.textContent = start ? '초기화' : '시작';
		const link = createElement('a', {
			route: '/',
		});

		link.appendChild(gameStartBtn);
		return link;
	};

	return {
		render,
	};
};

export default StartGameButton;

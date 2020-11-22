import { createElement, getElById } from '../common';

const StartGameButton = (start, setStart) => {
	const render = () => {
		const gameStartBtn = createElement('button', { id: 'game_btn' });
		gameStartBtn.textContent = start ? '초기화' : '시작';
		gameStartBtn.addEventListener('click', setStart);

		return gameStartBtn;
	};

	return {
		render,
		redraw: (start) => {
			getElById('game_btn').textContent = start ? '초기화' : '시작';
		},
	};
};

export default StartGameButton;

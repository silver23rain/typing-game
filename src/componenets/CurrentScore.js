import { createElement, getElById } from '../common';

const CurrentScore = () => {
	return {
		render: () => {
			const div = createElement('div', {
				className: ['status'],
			});
			div.innerHTML = `
                    <p>남은시간 : <span id="left_sec"></span>초</p>
                    <p>점수 : <span id="current_score"></span>점</p>
                `;
			return div;
		},
		redraw: (sec, score) => {
			getElById('left_sec').textContent = sec;
			getElById('current_score').textContent = score;
		},
	};
};

export default CurrentScore;

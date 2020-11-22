import { createElement, getElById } from '../common';

const CurrentScore = (sec, score) => {
	return {
		render: () => {
			const div = createElement('div');
			div.innerHTML = `
                <div>
                    <p>남은시간 : <span id="left_sec">${sec}</span>초</p>
                    <p>점수 : <span id="current_score">${score}</span>점</p>
                </div>`;
			return div;
		},
		redraw: (sec, score) => {
			getElById('left_sec').textContent = sec;
			getElById('current_score').textContent = score;
		},
	};
};

export default CurrentScore;

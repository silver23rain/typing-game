import { createElement } from '../common';

const EndGamePage = () => {
	const { score, avgSec } = JSON.parse(localStorage.getItem('gameScore'));
	const render = () => {
		const root = createElement('div', { className: ['box'] });

		const h2 = createElement('h2');
		h2.textContent = 'Mission Complete!';

		const h1 = createElement('h1');
		h1.textContent = `당신의 점수는 ${score}점 입니다.`;

		const avgSecText = createElement('p');
		avgSecText.textContent = `단어당 평균 답변 시간은 ${avgSec}초입니다.`;

		const restartBtn = createElement('button');
		restartBtn.textContent = '다시 시작';

		root.appendChild(h2);
		root.appendChild(h1);
		root.appendChild(avgSecText);
		root.appendChild(restartBtn);

		return root;
	};
	return {
		render,
	};
};

export default EndGamePage;

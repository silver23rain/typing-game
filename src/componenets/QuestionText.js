import { createElement, getElById } from '../common';

const QuestionText = () => {
	return {
		render: () => {
			const h1 = createElement('h1', { id: 'question' });
			return h1;
		},
		redraw: (question) => {
			document.getElementById('question').textContent = question;
		},
	};
};

export default QuestionText;

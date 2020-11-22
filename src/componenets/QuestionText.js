import { createElement, getElById } from '../common';

const QuestionText = (question) => {
	return {
		render: () => {
			const h1 = createElement('h1', { id: 'question' });
			h1.textContent = question;
			return h1;
		},
		redraw: (question) => {
			getElById('question').textContent = question;
		},
	};
};

export default QuestionText;

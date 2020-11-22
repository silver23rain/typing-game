import { createElement, getElById } from '../common';

const QuestionInput = (start, nextQuestion, check) => {
	const handleKeyup = (e) => {
		if (e.key === 'Enter') {
			if (!check(e.target.value)) {
				e.target.value = '';
				return;
			}
			e.target.value = '';
			nextQuestion();
		}
	};
	return {
		render: () => {
			const input = createElement('input', {
				id: 'typing',
				type: 'text',
			});
			if (!start) {
				input.disabled = true;
			}

			input.addEventListener('keyup', handleKeyup);
			return input;
		},
	};
};

export default QuestionInput;

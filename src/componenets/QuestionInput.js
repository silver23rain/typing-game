import { createElement } from '../common';

const QuestionInput = (nextQuestion, check) => {
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

			input.addEventListener('keyup', handleKeyup);
			return input;
		},
	};
};

export default QuestionInput;

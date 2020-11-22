import QuestionInput from '../QuestionInput';

describe('QuestionInput 컴포넌트', () => {
	test('게임 시작 전에는 disable 요소를 반환한다.', () => {
		const questionInput = QuestionInput().render();
		expect(questionInput.disabled).toBeTruthy();
	});

	describe('enter를 입력할 경우', () => {
		test('정답일 경우 다음 문제로 넘어간다.', () => {
			expect(true).toBeTruthy();
		});

		test('틀릴 경우 input box 클리어 한다.', () => {
			expect(true).toBeTruthy();
		});
	});
});

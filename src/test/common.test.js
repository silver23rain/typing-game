import { createElement } from '../common';

describe('createElement 테스트', () => {
	test('className 추가 테스트 ', () => {
		const testElem = createElement('div', {
			className: ['a', 'b'],
		});
		expect(testElem.classList).toContain('a');
		expect(testElem.classList).toContain('b');
	});
	test('그 외 속성값 테스트 ', () => {
		const testElem = createElement('input', {
			id: 'test_elem',
			disabled: 'true',
		});
		expect(testElem.id).toBe('test_elem');
		expect(testElem.disabled).toBeTruthy();
	});
});

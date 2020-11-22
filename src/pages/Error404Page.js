const { createElement } = require('../common');

const Error404Page = () => {
	return {
		render: () => {
			const h1 = createElement('h1');
			h1.textContent = '페이지를 찾을 수 없습니다.';
			return h1;
		},
	};
};

export default Error404Page;

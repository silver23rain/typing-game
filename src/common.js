export const createElement = function (elType, attributes) {
	const element = document.createElement(elType);
	for (let key in attributes) {
		if (key === 'className') {
			attributes[key].forEach((className) => {
				element.className += ` ${className}`;
			});
		} else {
			element.setAttribute(key, attributes[key]);
		}
	}
	return element;
};

export const getElById = (id) => document.getElementById(id);

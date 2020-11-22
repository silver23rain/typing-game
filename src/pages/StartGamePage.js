import CurrentScore from '../componenets/CurrentScore';
import QuestionInput from '../componenets/QuestionInput';
import QuestionText from '../componenets/QuestionText';
import StartGameButton from '../componenets/StartGameButton';

const fetchData = () => {
	return new Promise((resolve) => {
		fetch('https://my-json-server.typicode.com/kakaopay-fe/resources/words')
			.then(function (response) {
				return response.json();
			})
			.then(function (myJson) {
				resolve(myJson);
			});
	});
};

async function getData(callback) {
	const data = await fetchData();
	callback(data);
}

const StartGamePage = () => {
	let start = false;
	let questions;
	let question = '';
	let currentScore = '';
	let interval;
	let timeout;

	const play = () => {
		if (interval) {
			clearInterval(interval);
		}
		if (timeout) {
			clearTimeout(timeout);
		}
		if (questions.length === 0) {
			window.location.hash = '#done';
			return;
		}
		question = questions.shift();
		window.dispatchEvent(new HashChangeEvent('hashchange'));
		timeout = setTimeout(() => {
			if (interval) {
				clearInterval(interval);
			}
			if (!check(document.getElementById('typing').value)) {
				currentScore--;
				question.second--;
				window.dispatchEvent(new HashChangeEvent('hashchange'));
			}
			play();
		}, question.second * 1000);

		interval = setInterval(() => {
			question.second--;
			window.dispatchEvent(new HashChangeEvent('hashchange'));
		}, 1000);
	};

	const check = (inputValue) => inputValue === question.text;

	async function setData() {
		const data = await fetchData();
		questions = data;
		currentScore = questions.length;
		play();
		window.dispatchEvent(new HashChangeEvent('hashchange'));
	}

	const setStart = () => {
		start = !start;
		if (start) {
			setData();
		} else {
			if (interval) {
				clearInterval(interval);
			}
			if (timeout) {
				clearTimeout(timeout);
			}
			location.hash = '#';
			window.dispatchEvent(new HashChangeEvent('hashchange'));
		}
	};
	const render = () => {
		const box = document.createElement('div');
		box.classList.add('box');

		box.appendChild(
			CurrentScore(
				question.second ? question.second : '',
				currentScore
			).render()
		);
		box.appendChild(QuestionText(question.text).render());
		box.appendChild(QuestionInput(play, check).render());
		box.appendChild(StartGameButton(start, setStart).render());

		return box;
	};

	return {
		render,
	};
};

export default StartGamePage;

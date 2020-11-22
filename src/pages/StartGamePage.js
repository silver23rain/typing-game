import CurrentScore from '../componenets/CurrentScore';
import QuestionInput from '../componenets/QuestionInput';
import QuestionText from '../componenets/QuestionText';
import StartGameButton from '../componenets/StartGameButton';
import '../styles/StartGamePage.css';
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

const StartGamePage = () => {
	//state
	let start = false;
	let questions = [];
	let question = {};
	let totalTime = 0;
	let currentScore = null;

	// child component
	let currenScore, questionText, questionInput, startButton;

	let interval, timeout;
	const clearSchedule = () => {
		if (interval) {
			clearInterval(interval);
		}
		if (timeout) {
			clearTimeout(timeout);
		}
	};
	const redirectGameDone = () => {
		setStart();

		const avgSec = Math.round(totalTime / currentScore);
		history.pushState(
			{ score: currentScore, avgSec },
			'/done',
			window.location.origin + '/done'
		);
		window.dispatchEvent(new PopStateEvent('popstate'));
	};

	const nextQuestion = () => {
		clearSchedule();
		if (questions.length === 0) {
			redirectGameDone();
			return;
		}

		question = questions.shift();
		let time = question.second;

		redrawQuestionText();
		redrawScore(question.second, currentScore);

		timeout = setTimeout(() => {
			if (interval) {
				clearInterval(interval);
			}
			if (!check(document.getElementById('typing').value)) {
				redrawScore(question.second, currentScore--);
			}
			totalTime -= time;
			nextQuestion();
		}, (question.second + 1) * 1000);

		interval = setInterval(() => {
			++totalTime;
			redrawScore(--question.second, currentScore);
		}, 1000);
	};

	const check = (inputValue) => inputValue === question.text;

	const setStart = () => {
		start = !start;
		if (!start) {
			clearSchedule();
		}
	};

	const redrawQuestionText = () => {
		questionText.redraw(question.text);
	};
	const redrawScore = (sec, score) => {
		currenScore.redraw(sec, score);
	};

	async function setData() {
		const data = await fetchData();
		totalTime = 0;
		questions = data;
		currentScore = questions.length;
		nextQuestion();
	}

	const render = () => {
		if (start) {
			setData();
		}
		const box = document.createElement('div');
		box.classList.add('box');

		currenScore = CurrentScore();
		box.appendChild(currenScore.render());

		questionText = QuestionText();
		box.appendChild(questionText.render());

		questionInput = QuestionInput(start, nextQuestion, check);
		box.appendChild(questionInput.render());

		startButton = StartGameButton(start, setStart);
		box.appendChild(startButton.render());

		return box;
	};

	return {
		render,
	};
};

export default StartGamePage;

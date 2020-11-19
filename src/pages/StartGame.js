import '../styles/start.css';

const StartGame = () => {
	let start = false;
	let questions;
	let question;
	let currentScore;
	const requestData = () => {
		fetch('https://my-json-server.typicode.com/kakaopay-fe/resources/words')
			.then(function (response) {
				return response.json();
			})
			.then(function (myJson) {
				questions = myJson;
				currentScore = questions.length;
				document.getElementById('typing').disabled = false;
				document.getElementById('game_btn').textContent = '초기화';
				play();
			});
	};

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
			window.dispatchEvent(new HashChangeEvent('hashchange'));
			return;
		}
		question = questions.shift();
		document.getElementById('current_score').textContent = currentScore;
		document.getElementById('left_sec').textContent = question.second;
		document.getElementById('question').textContent = question.text;
		timeout = setTimeout(() => {
			if (interval) {
				clearInterval(interval);
			}
			if (!check(document.getElementById('typing').value)) {
				currentScore--;
			}
			play();
		}, question.second * 1000);
		interval = setInterval(() => {
			document.getElementById('left_sec').textContent = --question.second;
		}, 1000);
	};

	const check = (inputValue) => inputValue === question.text;
	const eventBind = () => {
		document.getElementById('game_btn').addEventListener('click', () => {
			start = !start;
			if (start) {
				requestData();
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
		});

		document.getElementById('typing').addEventListener('keyup', (e) => {
			if (e.key === 'Enter') {
				if (!check(e.target.value)) {
					e.target.value = '';
					return;
				}
				e.target.value = '';
				play();
			}
		});
	};
	const render = () => {
		return `
            <div class="box">
                <div>
                    <p>남은시간 : <span id="left_sec">-</span>초</p>
                    <p>점수 : <span id="current_score">-</span>점</p>
                </div>
                <h1 id="question">-</h1>
                <input id="typing" type="text" disabled>
                <button id="game_btn">
                    시작
                </button>
            </div>
        `;
	};

	return {
		render,
		eventBind,
	};
};

export default StartGame;

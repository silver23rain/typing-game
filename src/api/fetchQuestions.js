export default function fetchQuestion() {
	return new Promise((resolve, reject) => {
		fetch('https://my-json-server.typicode.com/kakaopay-fe/resources/words')
			.then(function (response) {
				return response.json();
			})
			.then(function (myJson) {
				if (!myJson || myJson.length === 0) {
					reject('표시할 문제가 없습니다.');
				}

				resolve(myJson);
			});
	});
}

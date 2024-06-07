const cors = require('cors');

const breakRoutes = (app, fs, corsOptionsDelegate) => {
	const dataPath = './data/breakbeats.json';

	// refactored helper methods
	const readFile = (callback, returnJson = false, encoding = 'utf8', filePath = dataPath) => {
		fs.readFile(filePath, encoding, (err, data) => {
			if (err) {
				throw err;
			}

			callback(returnJson ? JSON.parse(data) : data);
		});
	};

	const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {
		fs.writeFile(filePath, fileData, encoding, err => {
			if (err) {
				throw err;
			}

			callback();
		});
	};

	// READ
	// Notice how we can make this 'read' operation much more simple now.
	app.get('/breakbeats', cors(corsOptionsDelegate), (req, res) => {
		readFile(data => {
			res.send(data);
		}, true);
	});

	// CREATE
	app.post('/breakbeats', (req, res) => {
		readFile(data => {
			// Note: this needs to be more robust for production use.
			// e.g. use a UUID or some kind of GUID for a unique ID value.
			// const newbreakbeatsId = Date.now().toString();
			const newFinal = data;
			const newBreak = req.body;
			newFinal.push(newBreak);

			writeFile(JSON.stringify(newFinal, null, 2), () => {
				res.status(200).send('new breakbeats added');
			});
		}, true);
	});

	// UPDATE
	app.put('/breakbeats/:id', (req, res) => {
		readFile(data => {
			// add the new user
			const breakbeatsId = req.params['id'];
			const body = (data[breakbeatsId] = req.body);
			//  console.log('&&', data)
			const elementsIndex = data.findIndex(el => {
				return el.breakbeatsId === breakbeatsId;
			});

			let newUpdated = [...data];

			newUpdated[elementsIndex] = body;

			writeFile(JSON.stringify(newUpdated, null, 2), () => {
				res.status(200).send(`breakbeats id:${breakbeatsId} updated`);
			});
		}, true);
	});

	// DELETE
	app.delete('/breakbeats/:id', cors(corsOptionsDelegate), (req, res) => {
		readFile(data => {
			// add the new user
			const breakbeatsId = req.params['id'];
			delete data[breakbeatsId];
			writeFile(JSON.stringify(data, null, 2), () => {
				res.status(200).send(`breakbeats id:${breakbeatsId} removed`);
			});
		}, true);
	});

};

module.exports = breakRoutes;

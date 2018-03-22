'use strict';

module.exports = client => ({
	get: (fileName) => {
		client.get('My Documents\\' + fileName, (err, stream) => {
			if (err) {
				console.error(err);
				return process.exit(1);
			}

			stream.once('close', () => {
				console.log('File downloaded correctly.');
				client.end();
			});

			stream.pipe(fs.createWriteStream(fileName));
		});

	},

	put: (text, fileName) => {
		client.put(text, 'My Documents\\' + fileName, false, err => {
			if (err) {
				console.error(err);
				return process.exit(1);
			}

			console.log('File uploaded correctly.');

			client.end();
		});
	}
});
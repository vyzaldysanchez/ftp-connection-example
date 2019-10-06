'use strict';

const fs = require('fs');

module.exports = ({ client, storagePath }) => ({
	get(fileName) {
		client.get(`${storagePath}/${fileName}`, function onFileRetrieval(err, stream) {
			if (err) {
				console.error(err);
				return process.exit(1);
			}

			stream.once('close', function onStreamClose() {
				console.log('File downloaded correctly.');
				client.end();
			});

			stream.pipe(fs.createWriteStream(fileName));
		});
	},

	put(text, fileName) {
		client.put(text, `${storagePath}/${fileName}`, false, function onFilePut(err) {
			if (err) {
				console.error(err);
				return process.exit(1);
			}

			console.log('File uploaded correctly.');

			client.end();
		});
	}
});

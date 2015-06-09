install:
	@npm install
	@node_modules/.bin/gulp build

test: install
	@npm test

test-sherlocked: install
	@SUBMISSION_CLIENT_PORT=8000 node_modules/.bin/gulp serve &
	@sleep 5 && node sherlocked.js

install:
	@npm install
	@node_modules/.bin/gulp build

test-sherlocked: install
	@python -m SimpleHTTPServer &
	@sleep 5 && node sherlocked.js

test:
	@npm install
	@npm run build
	@npm test

test-sherlocked:
	@npm install
	@NODE_ENV=test MOCK_DATA=true npm run serve-js &
	@npm run serve &
	@sleep 5 && node sherlocked.js

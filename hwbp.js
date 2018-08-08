const chalk = require('chalk');
const request = require('request-promise');

const RATE_LIMIT = 1500; // haveibeenpwned.com API rate limit
const CURRENT_YEAR = new Date().getFullYear().toString();

function plusAlias(account, alias) {
	if (!alias) {
		return account;
	}

	return account.replace('@', `+${alias}@`);
}

function mapRequests(accounts) {
	return accounts.reduce((list, account) => {
		if (!account.hasOwnProperty('aliases')) {
			return list.concat(account.address);
		}

		return list.concat([
			account.address,
			...account.aliases
				.reduce((subList, alias) =>
					subList.concat(plusAlias(account.address, alias))
				, [])
		]);
	}, []);
}

function rateLimit(limit) {
    return new Promise((resolve) => setTimeout(resolve, limit));
}

function listBreaches(response) {
	return response.reduce((list, breach) => {
		let listItem = `${breach.Title} (${breach.BreachDate})`;

		if (breach.BreachDate.startsWith(CURRENT_YEAR)) {
			listItem = chalk.bgRed.white.bold(listItem);
		}

		if (list === '') {
			return listItem;
		}

		return `${list}, ${listItem}`;

	}, '');
}

async function hwbp(requests) {
	process.stdout.write('\x1Bc');
	console.log(chalk.bgBlue.white.bold(' HaveWeBeenPwned? '));

	for (let account of requests) {
		let limit = RATE_LIMIT;
		
		await request({
				url: `https://haveibeenpwned.com/api/v2/breachedaccount/${account}`,
				headers: {
					'User-Agent': 'request'
				},
				json: true
			})
			.then((response) => {
				console.log(chalk.red(`${account}: ${listBreaches(response)}`));
			})
			.catch((error) => {
				if (error.statusCode === 404) {
					console.log(`${chalk.blue(account)}: ${chalk.green('Ok')}`);
					return;
				}

				// Too many requests
				if (error.statusCode === 429) {
					requests.push(account);
					limit = error.response.headers['retry-after'] * 1000;
					return;
				}

				// Forbidden
				if (error.statusCode === 403) {
					console.log(`Forbidden — no user agent has been specified in the request`);
					return;
				}

				// Bad request
				if (error.statusCode === 400) {
					console.log(chalk.yellow(`${account}: ${error.statusCode} (Bad request)`));
					return;
				}

				console.log(chalk.yellow(`${account}: ${error.statusCode}`));
			});
		
		await rateLimit(limit);
	}
}

hwbp(mapRequests(require('./accounts')));

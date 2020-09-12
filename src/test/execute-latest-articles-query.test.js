import { createTestServer } from './test-server';
import {
	executeLatestArticlesQuery,
	GraphQLError,
} from '../execute-latest-articles-query';
import { createTestArticlePublishedOneDayAgo } from './data/create-test-article';

describe('executeLatestArticlesQuery', () => {
	let testServer;
	beforeAll((done) => {
		testServer = createTestServer({ port: 4123 });
		testServer.listen(done);
	});
	afterAll((done) => {
		testServer.close(done);
	});
	it('executes the correct request', async () => {
		// [...]
	});

	it('get the latest articles from the graphQL response', async () => {
		// [...]
	});

	it('fails with a GraphQLError if there are graphQL errors in the response', async () => {
		// arrange
		expect.assertions(1);
		const domain = 'www.my-website.co.uk';
		const graphQLEndpoint = 'http://localhost:4123';
		const expectedErrors = [
			{
				message: 'some error',
			},
			{
				message: 'some other error',
			},
		];
		testServer.setResponse({
			status: 400,
			body: {
				errors: expectedErrors,
			},
		});

		// act & assert
		await expect(
			executeLatestArticlesQuery({ domain, graphQLEndpoint })
		).rejects.toEqual(new GraphQLError(expectedErrors));
	});
});

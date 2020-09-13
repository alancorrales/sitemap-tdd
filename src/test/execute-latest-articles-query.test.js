import { createTestServer } from './test-server';
import {
	createExecuteLatestArticlesQuery,
	createFakeExecuteLatestArticlesQuery,
	GraphQLError,
} from '../execute-latest-articles-query';
import { createTestArticlePublishedOneDayAgo } from './data/create-test-article';

describe('executeLatestArticlesQuery', () => {
	let testServer;
	beforeAll();
	// [...]
	afterAll();
	// [...]
	it('executes the correct request', async () => {
		// ...
	});

	it('get the latest articles from the graphQL response', async () => {
		// ...
	});

	it('fails with a GraphQLError if there are graphQL errors in the response', async () => {
		// ...
	});

	it('response can be faked with predefined articles for a specific domain', async () => {
		// arrange
		expect.assertions(2);
		const domainA = 'www.domain-a.co.uk';
		const expectedArticlesForDomainA = [
			createTestArticlePublishedOneDayAgo(),
			createTestArticlePublishedOneDayAgo(),
			createTestArticlePublishedOneDayAgo(),
		];
		const domainB = 'www.domain-b.co.uk';
		const expectedArticlesForDomainB = [
			createTestArticlePublishedOneDayAgo(),
			createTestArticlePublishedOneDayAgo(),
			createTestArticlePublishedOneDayAgo(),
		];
		const executeLatestArticlesQuery = createFakeExecuteLatestArticlesQuery(
			{
				[domainA]: expectedArticlesForDomainA,
				[domainB]: expectedArticlesForDomainB,
			}
		);

		// act
		const receivedArticlesForDomainA = await executeLatestArticlesQuery({
			domain: domainA,
		});
		const receivedArticlesForDomainB = await executeLatestArticlesQuery({
			domain: domainB,
		});

		// assert
		expect(receivedArticlesForDomainA).toEqual(expectedArticlesForDomainA);
		expect(receivedArticlesForDomainB).toEqual(expectedArticlesForDomainB);
	});
});

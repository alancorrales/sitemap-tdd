import { createTestServer } from "./test-server";
import { executeLatestArticlesQuery } from "../execute-latest-articles-query";
import { createTestArticlePublishedOneDayAgo } from "./data/create-test-article";

describe("executeLatestArticlesQuery", () => {
  let testServer;
  beforeAll((done) => {
    testServer = createTestServer({ port: 4123 });
    testServer.listen(done);
  });
  afterAll((done) => {
    testServer.close(done);
  });
  it("executes the correct request", async () => {
    // [...]
  });

  it("get the latest articles from the graphQL response", async () => {
    // arrange
    expect.assertions(1);
    const domain = "www.my-website.co.uk";
    const graphQLEndpoint = "http://localhost:4123";
    const expectedArticles = [
      createTestArticlePublishedOneDayAgo(),
      createTestArticlePublishedOneDayAgo(),
      createTestArticlePublishedOneDayAgo(),
    ];
    testServer.setResponse({
      status: 200,
      body: {
        data: {
          latestArticles: expectedArticles,
        },
      },
    });

    // act
    const articles = await executeLatestArticlesQuery({
      domain,
      graphQLEndpoint,
    });

    // assert
    expect(articles).toEqual(expectedArticles);
  });
});
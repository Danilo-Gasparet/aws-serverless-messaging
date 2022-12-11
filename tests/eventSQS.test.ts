import { formatJSONResponse } from '../src/libs/api-gateway';

describe('[formatJSONResponse]', () => {
  it('Returns a JSON object with a 200 status code ', async () => {
    const objParam = {
        info: 'Your message has been received successfully',
        number: '123',
        message: 'Hello Jest'
      }

    const objResponse = {
        statusCode: 200,
        body: JSON.stringify(objParam)
    }

    expect(formatJSONResponse(objParam)).toStrictEqual(objResponse);
  });
});
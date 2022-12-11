import { formatJSONResponse } from "../src/libs/api-gateway";
import { formatMessage } from "../src/functions/eventAPIGateway/handler";
import { MessageInput } from "../src/functions/eventAPIGateway/schemas/inputSchema";

describe("Helper Functions", () => {
  it("[formatJSONResponse] : Returns a JSON object with a 200 status code ", async () => {
    const objParam = {
      info: "Your message has been received successfully",
      number: "123",
      message: "Hello Jest",
    };

    const objResponse = {
      statusCode: 200,
      body: JSON.stringify(objParam),
    };

    expect(formatJSONResponse(objParam)).toStrictEqual(objResponse);
  });

  it("[formatMessage] : Adds an ID field to th message object ", async () => {
    const messageInput: MessageInput = {
      number: "123",
      message: "Hello Jest",
    };

    expect(formatMessage(messageInput)).toHaveProperty("id");
  });
});


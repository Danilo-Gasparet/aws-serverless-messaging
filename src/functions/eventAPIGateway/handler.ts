import inputSchema, { MessageInput, Message } from './schemas/inputSchema';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { v4 as uuid } from 'uuid';
import { SNS } from "aws-sdk";

// Receiving the input (http body) and adding an unique ID to it
export const formatMessage = (messageInput: MessageInput): Message => {
  return {
    id: uuid(),
    ...messageInput,
  }
}

// Function that publishes the message to SNS and handles the response
const publishMessage = async (message: Message) => {
  // Assigning the SNS publish event parameters
  const eventInput = {
    Message: JSON.stringify(message),
    TopicArn: process.env.topicArn,
  };

  // Publish the event to the SNS Topic
  const publishEventPromise = new SNS({ apiVersion: '2010-03-31' }).publish(eventInput).promise();

  try {
    // Wait for the response from SNS
    const result = await publishEventPromise;
    console.log(`The message published with the id ${result.MessageId}`);
  } 
  catch (error) {
    // Catch any errors from SNS
    console.error(error);
    throw new Error("Failed to publish the message to SNS using the topic parameter");
  }
}

const message: ValidatedEventAPIGatewayProxyEvent<typeof inputSchema> = async (event) => {  
  const identifiableMessage = formatMessage(event.body);
  
  // Publish the message async.
  await publishMessage(identifiableMessage);

  // Return a response to the caller
  return formatJSONResponse({
    info: 'Your message has been received successfully',
    number: identifiableMessage.number,
    message: identifiableMessage.message,
    event,
  });

};

export const main = middyfy(message);

import { SqsMessage } from "./schemas/inputSchema";
import { SNS } from "aws-sdk";
import { Handler, SQSEvent } from "aws-lambda";
import { formatJSONResponse } from '@libs/sqs-message';
import { middyfy } from '@libs/lambda';

// Function that sends the message via SNS
const publishMessage = async (objMessage: SqsMessage) => {
  // Assigning the SNS publish event parameters
  const messageParams = {
    Message: objMessage.message,
    PhoneNumber: objMessage.number,
  };
  // Publish the message to SNS SMS
  const publishEventPromise = new SNS({ apiVersion: "2010-03-31" }).publish(messageParams).promise();

  try {
    // Wait for the response from SNS
    const result = await publishEventPromise;
    console.log(`The message was sent with the id ${result.MessageId}`);
  } catch (error) {
    // Catch any errors from SNS
    console.error(error);
    throw new Error("Failed to publish the message to SNS using the SMS parameter");
  }
};

// TODO Validate the input using types like in other function
const consumeSqsMessage: Handler = async (event: SQSEvent) => {
  const sqsMessageBody = JSON.parse(event.Records[0]?.body);

  // Publish the message async.
  await publishMessage(sqsMessageBody);

  // Return a response to the caller
  return formatJSONResponse({
    info: 'Your message has been sent successfully',
    number: sqsMessageBody.number,
    message: sqsMessageBody.message,
    event,
  });


};

// TODO configure middify
export const main = consumeSqsMessage;

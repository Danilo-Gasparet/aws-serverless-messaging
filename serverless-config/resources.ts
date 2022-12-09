import type { AWS } from "@serverless/typescript";

export const resources: AWS["resources"] = {
  Resources: {
    // Creating the SNS resource topic
    messagingSNS: {
      Type: "AWS::SNS::Topic",
      Properties: {
        TopicName:
          "${self:service}-${opt:stage, self:provider.stage}-message-topic",
      },
    },

    // Creating the SQS queue
    messagingSQS: {
      Type: "AWS::SQS::Queue",
      DependsOn: ["messagingDLQ"],
      Properties: {
        QueueName:
          "${self:service}-${opt:stage, self:provider.stage}-message-queue",
        RedrivePolicy: {
          deadLetterTargetArn: { "Fn::GetAtt": ["messagingDLQ", "Arn"] },
          maxReceiveCount: 1,
        },
      },
    },

    // Creating the SQS dead letter queue
    messagingDLQ: {
      Type: "AWS::SQS::Queue",
      Properties: {
        QueueName:
          "${self:service}-${opt:stage, self:provider.stage}-message-dead-letter-queue",
        MessageRetentionPeriod: "1209600", // 14 days in seconds
      },
    },

    // Creating the SQS queue policy 
    messagingSQSPolicy: {
      Type: "AWS::SQS::QueuePolicy",
      DependsOn: ["messagingSQS", "messagingDLQ"],
      Properties: {
        PolicyDocument: {
          Statement: [
            {
              Effect: "Allow",
              Principal: "*",
              Resource: { "Fn::GetAtt": ["messagingSQS", "Arn"] },
              Action: ["SQS:SendMessage", "SQS:ReceiveMessage"],
              Condition: {
                ArnEquals: {
                  "aws:SourceArn": [{ Ref: "messagingSNS" }],
                },
              },
            },
          ],
        },
        Queues: [{ Ref: "messagingSQS" }],
      },
    },

    // Creating the subscription between SQS (subscriber) and SNS
    messagingSNSSubscription:{
      Type: "AWS::SNS::Subscription",
      DependsOn: ["messagingSNS", "messagingSQS"],
      Properties: {
        TopicArn: { Ref: "messagingSNS" },
        Endpoint: { "Fn::GetAtt": ["messagingSQS", "Arn"] },
        Protocol: "sqs",
        RawMessageDelivery: true,
      }
    }
  
  },
};

module.exports = { resources };

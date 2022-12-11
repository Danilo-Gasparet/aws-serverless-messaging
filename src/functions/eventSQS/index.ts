import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      sqs: {
        arn: {
          "Fn::GetAtt": ["messagingSQS", "Arn"],
        },
        batchSize: 1,
        // Optionally you could add a filter here to reduce lambda processing
      },
    },
  ],
  iamRoleStatements: [
    {
      Effect: "Allow",
      Action: [
        "sqs:ReceiveMessage",
        "sqs:DeleteMessage",
        "sqs:GetQueueAttributes",
      ],
      Resource: [
        {
          "Fn::GetAtt": ["messagingSQS", "Arn"],
        },
      ],
    },
    {
      Effect: "Allow",
      Action: [
        "sns:Publish",
      ],
      // TODO - Make this policy more granular with regards to the resource   { Ref: "messagingSNS" }
      Resource: "*",
    },
  ],
  iamRoleStatementsInherit: true,
};

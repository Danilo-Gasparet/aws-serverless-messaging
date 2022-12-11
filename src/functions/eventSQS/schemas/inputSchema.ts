import { FromSchema } from "json-schema-to-ts";

// Creating a JSON schema
const sqsSchema = {
  type: "object",
  properties: {
    id: { type: 'string' },
    number: { type: 'string' },
    message: { type: 'string' }, 
  },
  required: ['id', 'number', 'message']
} as const;


// Exporting the MessageInput type using the JSON schema above
export type SqsMessage = FromSchema<typeof sqsSchema>;

// Exporting the input JSON schema
export default sqsSchema;
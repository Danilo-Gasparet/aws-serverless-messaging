
### AWS Serverless Messaging Todo's:

+ #### Priority 0
    - Add jest integration tests
    - Replace the ES Build plugin bundler with serverless webpack

+ #### Priority 1 
    - Create a new API to create sandbox phone number and send OTP
    - Create API to verify SMS Sandbox phone number using OTP
    - Create API to opt-in and opt-out a phone number

+ #### Priority 2
    - Read up and learn more about middy middleware so that I can add more validation and error handling
    - Manage messages sent to the DLQ ( Send a notification, attempt to retry again after a longer period, attempt to format body etc..)
    - Add user authentication to APIs
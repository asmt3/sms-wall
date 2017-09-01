# sms-wall
Displays SMSs sent to a Twilio phone number and displays then in a slideshow


![UX](./BandNames.gif)

# Requirements
eb-cli

# Setting up

## Get a Twilio Acount
1. Record your API details
2. Create a phone number from which you can send and receive SMS

## Get a Firebase Account
1. Create a Firebase account
2. Create a database
3. Generate a "Service Account" key (a JSON file that looks like this)
  ```
  {
    "type": "service_account",
    "project_id": "*****",
    "private_key_id": "*****",
    "private_key": "-----BEGIN PRIVATE KEY-----*****\n-----END PRIVATE KEY-----\n",
    "client_email": "*****",
    "client_id": "*****",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://accounts.google.com/o/oauth2/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "*****"
  }
```
4. Save this JSON file as config/firebase.json
5. Create a .env file in this directory
  ```
  TWILIO_ACCOUNT_ID=***
  TWILIO_AUTH_TOKEN=***
  TWILIO_PHONE_NUMBER='***'
  ```


# Testing locally
1. Clone this repo and `cd sms-wall`
2. `npm install`
3. `npm run dev`
4. 

# Deployment
1. Clone this repo and `cd sms-wall`
2. `eb init --profile <your profile name>` (If you only have one AWS profile, you do not need to specify profile)
3. Define the environment by answering the questions from eb-cli
4. `eb create`
5. Update Environment variables in the Beanstalk app
6. Update the webhook in your Twilio account for received SMSs



### example Twilio payload
```
{ 
  ToCountry: 'GB',
  ToState: '',
  SmsMessageSid: 'SM69c4de4413412078982195d61e8467fb',
  NumMedia: '0',
  ToCity: '',
  FromZip: '',
  SmsSid: 'SM69c4de4413412078982195d61e8467fb',
  FromState: '',
  SmsStatus: 'received',
  FromCity: '',
  Body: 'Test',
  FromCountry: 'GB',
  To: '+447492881533',
  ToZip: '',
  NumSegments: '1',
  MessageSid: 'SM69c4de4413412078982195d61e8467fb',
  AccountSid: 'AC427e52e5d91ac7ee98f4367bd17ff2fc',
  From: '+447833086722',
  ApiVersion: '2010-04-01' 
  }
  ```



'use strict';

// [START dialogflow_es_webhook]

// TODO: Add handleWebhook to 'Entry point' in the Google Cloud Function
exports.handleWebhook = (request, response) => {
  const tag = request.body.queryResult.intent.displayName;

  let jsonResponse = {};
  if (tag === 'Default Welcome Intent') {
    //fulfillment response to be sent to the agent if the request tag is equal to "welcome tag"
    jsonResponse = {
      fulfillment_messages: [
        {
          text: {
            //fulfillment text response to be sent to the agent
            text: ['Hello from a GCF Webhook'],
          },
        },
      ],
    };
  } else if (tag === 'get-name') {
    //fulfillment response to be sent to the agent if the request tag is equal to "welcome tag"
    jsonResponse = {
      fulfillment_messages: [
        {
          text: {
            //fulfillment text response to be sent to the agent
            text: ['My name is Flowhook'],
          },
        },
      ],
    };
  } else {
    jsonResponse = {
      //fulfillment text response to be sent to the agent if there are no defined responses for the specified tag
      fulfillment_messages: [
        {
          text: {
            ////fulfillment text response to be sent to the agent
            text: [
              `There are no fulfillment responses defined for "${tag}"" tag`,
            ],
          },
        },
      ],
    };
  }
  response.send(jsonResponse);
};
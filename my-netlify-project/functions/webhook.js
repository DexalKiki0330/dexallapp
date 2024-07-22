const { Client, middleware } = require('@line/bot-sdk');

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET
};

const client = new Client(config);

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  await Promise.all(body.events.map(handleEvent));
  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  };
};

async function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return null;  // Only handle text messages
  }

  const echo = { type: 'text', text: event.message.text };
  return client.replyMessage(event.replyToken, echo);
};

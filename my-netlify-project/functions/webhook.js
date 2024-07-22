const { Client } = require('@line/bot-sdk');

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};

const client = new Client(config);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  const body = JSON.parse(event.body);

  try {
    await Promise.all(body.events.map(handleEvent));
    return {
      statusCode: 200,
      body: 'OK',
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: 'Internal Server Error',
    };
  }
};

async function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: event.message.text,
  });
}

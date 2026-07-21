import makeRequest from './makeRequest';

const sendMessage = ({ channelID, userId, image, text, file }: { channelID?: string, userId?: string, image?: string, text?: string, file?: any }) => {
  return makeRequest('chat/message', {
    method: 'POST',
    body: {
      channel: channelID,
      sender: userId,
      message: text,
      image,
      file
    }
  });
};

export default sendMessage;

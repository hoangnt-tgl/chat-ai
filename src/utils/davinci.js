import { Configuration, OpenAIApi } from 'openai';

export const davinci = async (prompt, key) => {
  const configuration = new Configuration({
    apiKey: key,
  });

  delete configuration.baseOptions.headers['User-Agent'];

  const openai = new OpenAIApi(configuration);
  let conversation = window.localStorage.getItem('conversation');
  const conversationArray = JSON.parse(conversation);
  console.log(conversationArray);
  conversationArray.push({ role: 'user', content: `${prompt}?` });

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: conversationArray,
    temperature: 0.3,
    max_tokens: 1000,
    top_p: 0.3,
    frequency_penalty: 0.5,
    presence_penalty: 0.2,
  });

  conversationArray.push({ role: 'assistant', content: response.data.choices[0].message.content });
  window.localStorage.setItem('conversation', JSON.stringify(conversationArray));
  return response;
};

import { Configuration, OpenAIApi } from 'openai';
export const davinci = async (prompt, key) => {
  const configuration = new Configuration({
    apiKey: key,
  });

  delete configuration.baseOptions.headers['User-Agent'];

  const openai = new OpenAIApi(configuration);
  let conversation = window.localStorage.getItem('conversation');
  const conversationArray = JSON.parse(conversation);

  const len = conversationArray.length;
  if(len>=6){
    conversationArray.shift();
    conversationArray.shift();
  }
  
  conversationArray.push({ role: 'user', content: `${prompt}?` });
 
 
  const request = {
    model: 'gpt-3.5-turbo',
    messages: conversationArray,
    temperature: 0.3,
    max_tokens: 1000,
    top_p: 0.3,
    frequency_penalty: 0.5,
    presence_penalty: 0.2,
  }
  console.log(request);
  const response = await fetch('http://localhost:3001/api/chat', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(request),
  }) 
  .then(response => response.json())
  .then(data => {
    console.log(data);
    conversationArray.push({ role: 'assistant', content: data});
    console.log("conversationArray",conversationArray);
    window.localStorage.setItem('conversation', JSON.stringify(conversationArray));
    return data;
  })
  .catch(error => {
    console.error(error); // Handle any errors that occurred during the request
  });;

  // const response = await openai.createChatCompletion(request).then(response => {
  //   if (response.status === 429) {
  //     throw new Error('Rate limit exceeded');
  //   }
  //   return response;
  // });
  // const resString = JSON.stringify(response);
  // return resString;
};

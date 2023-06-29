import { Configuration, OpenAIApi } from 'openai';
export const checkApiKey = async (keys) => {
  const configuration = new Configuration({
    apiKey: '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',
  });

  const openai = new OpenAIApi(configuration);

  return openai.listModels();
};

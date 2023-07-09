import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Configuration, OpenAIApi } from 'openai';

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.post('/api/chat',async (req, res) => {
    const configuration = new Configuration({
        apiKey: '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',
    });
    
    delete configuration.baseOptions.headers['User-Agent'];
    
    const openai = new OpenAIApi(configuration); 
    const request = req.body;
    console.log(request);
    const response = await openai.createChatCompletion(request);
    const resData = JSON.stringify(response.data.choices[0].message.content);
    console.log(resData);

    res.json(resData);
});

const port = 3001; // Choose a port number
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

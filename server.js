import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Configuration, OpenAIApi } from 'openai';

const app = express();
app.use(cors());
app.use(bodyParser.json());
const key1 = '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';
const key2 = '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';
const key3 = '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';
let arrayKey = [key1, key2, key3];

app.post('/api/chat',async (req, res) => {
    const key = arrayKey[0];
    console.log(key);
    const configuration = new Configuration({
        apiKey: key,
    });
    
    delete configuration.baseOptions.headers['User-Agent'];
    
    const openai = new OpenAIApi(configuration); 
    const request = req.body;
    // console.log(request);
    const response = await openai.createChatCompletion(request);
    // console.log(response.data.id);
    // const data = {
    //   ans: response.data.choices[0].content,
    //   id : response.data.id
    // }
    // console.log(data);
    // const resData = JSON.stringify(data);
    const resData = JSON.stringify(response.data.choices[0].message.content);
                                    // id : response.data.choices[0].id });
    console.log(resData);
    arrayKey.shift();
    arrayKey.push(key);
    res.json(resData);
});

const port = 3001; // Choose a port number
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

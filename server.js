import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
const key1 = process.env.KEY_1;
const key2 = process.env.KEY_2;
const key3 = process.env.KEY_3;
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

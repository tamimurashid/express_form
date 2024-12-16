import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url'

const port = process.env.port || 3000;

const app = express();
const data = [
    {id:1, title: 'intro', name: 'tamimu'},
    {id:2, title: 'new intro', name: 'juma'},

];
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/post',(req, res) =>{
    res.json(data);
})



app.listen(port, () => console.log(`Server is running on port 3000`));


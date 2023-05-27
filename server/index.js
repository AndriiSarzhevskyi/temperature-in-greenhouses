import express from 'express';
import {greenrouter} from './routes/greenhouse.routes.js'
import {temperaturerouter} from './routes/temperatures.routes.js'
const app = express();

app.use('/api/greenhouse',greenrouter);
app.use('/api/temperatures', temperaturerouter);

async function start(){
    try{
        app.listen(5000, ()=>console.log(`App started on port: 5000...`));
    } catch(e){
        console.log("Server ERROR", e.message);
        process.exit(1);
    }
}

start()

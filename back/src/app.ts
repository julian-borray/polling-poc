import express = require('express');
const compression = require('compression');
import * as path from "path";
import {ChatModule} from "./modules/chat/ChatModule";
const cors = require('cors');
const {ItemModule} = require('./modules/product/ItemModule');

export class App {
    app: express.Application = express();
    itemModule: any;
    chatModule: any;
    constructor() {
        this.itemModule = new ItemModule();
        this.chatModule = new ChatModule();
        this.listen();
    }
    private listen() {
        this.app.use(cors());
        this.app.use(compression());
        this.app.use(express.static(path.join(__dirname, './public')));
        this.app.use('/api', this.itemModule.setup());
        this.app.use('/api', this.chatModule.setup());
        this.app.use('/', function (req, res, next) {
            res.sendFile(path.resolve(__dirname,'../build/public/index.html'));
        });
        const port = process.env.PORT || 3007;
        this.app.listen(port,  () => {
            console.log(`listening on http://localhost:${port}`,'192.168.20.29');
        });
    }
}
const app = new App();

import express = require('express');
import {ChatProvider} from "../providers/ChatProvider";

export class ChatController {
    private readonly router: express.Application;
    chatProvider: any;
    constructor() {
        this.router = express();
        this.chatProvider = new ChatProvider();
    }
    createServices() {
        this.router.get('/messages/:chatId', async (req,  res) => {
            try{
                if (req.params.chatId) {
                    const value = this.chatProvider.pollMessages(req.params.chatId);
                    res.status(200).send(value);
                } else{
                    throw "el parametro de busqueda 'chatId' no es válido";
                }
            } catch (err) {
                res.status(500).json({message: err});
            }
        });
        this.router.get('/messages', async (req,  res) => {
            try{
                const value = this.chatProvider.getMessages();
                res.status(200).send(value);
            } catch (err) {
                res.status(500).json({message: err});
            }
        });
        return this.router;
    }
}

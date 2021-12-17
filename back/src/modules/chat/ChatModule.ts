const {ChatController} = require('./controllers/ChatController');

export class ChatModule {
    chatController: any;
    constructor() {
        this.chatController = new ChatController();
        this.setup();
    }
    setup(){
        console.log("modulo de chat");
        return this.chatController.createServices();
    }
}

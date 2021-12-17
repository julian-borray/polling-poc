import {IMessage} from "../../common/interfaces/IMessage";
import Messages from '../resources/ChatMessages';
export class ChatProvider {

    pollMessages(conversationId: number): IMessage[] {
        const randomNum = Math.floor(Math.random() * (10 - 0 + 1) + 0);
        const message = Messages[conversationId ? conversationId : randomNum];
        const messageArray = [];
        messageArray.push(message);
        return messageArray;
    }
    getMessages(): IMessage[] {
        return Messages.slice(0,5);
    }
}

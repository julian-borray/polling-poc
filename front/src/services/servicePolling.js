import { io } from "socket.io-client";
export const ServicePolling = () => {
    const socket = io(`https://jsonplaceholder.typicode.com`,
        {
            transports: ['polling'],
            path: '/posts/1'
        });
    return socket;
}

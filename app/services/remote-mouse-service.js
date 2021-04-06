import getWebSocketInstance from './web-socket-instance'

const tag = "WebSocket"


export default (webSocketInstance) => {
    const start = () => {
        webSocketInstance.onerror = (e) => {
            console.log(tag, 'Error', e.message);
        };
        webSocketInstance.onopen = (ws, event) => {
            console.log(tag, "Socket open");
            webSocketInstance.isAlive = true
            webSocketInstance.send('hey hammerspoon')
        };

        webSocketInstance.onmessage = evt => {
            console.log(evt.data)
        }

        webSocketInstance.onclose = () => {
            console.log(tag, "Socket closed");
        };
    }

    const sendMessage = (message) => {
        if(webSocketInstance.isAlive)
            webSocketInstance.send(message)
    }
    return {
        start,
        sendMessage
    }
}

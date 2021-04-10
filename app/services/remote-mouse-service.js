const tag = "WebSocket"


export default (webSocketInstance) => {
    const start = () => {
        webSocketInstance.onerror = (event) => {
            console.log(tag, 'Error', event.message);
        };
        webSocketInstance.onopen = () => {
            console.log(tag, "Socket open");
            webSocketInstance.isAlive = true
        };

        webSocketInstance.onmessage = event => {
            console.log(event.data)
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

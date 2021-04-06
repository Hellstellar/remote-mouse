export default (webSocketServerUrl) => {
    const webSocket = new WebSocket(webSocketServerUrl);
    webSocket.isAlive = false;
    return webSocket;
}
export default (webSocketServerUrl) => {
    return new WebSocket(webSocketServerUrl);
}
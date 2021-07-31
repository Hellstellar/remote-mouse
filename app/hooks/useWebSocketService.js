import {useEffect, useState} from "react";
import getWebSocketInstance from "../services/web-socket-instance";


const isValidUrl = (remoteUrl) => {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(remoteUrl);
}

const remoteUrlBuilder = (remoteIpAddress) => {
    //TODO: Add free port finder
    return `http://${remoteIpAddress}/?clientName=MobileClient`
}

const useWebSocketService = (openConnectionHandler, closedConnectionHandler, errorHandler) => {
    const [webSocketInstance, setWebSocketInstance] = useState({})

    const setRemoteConnection = (remoteIpAddress) => {
        const remoteUrl = remoteUrlBuilder(remoteIpAddress)
        if(isValidUrl(remoteUrl))
            setWebSocketInstance(getWebSocketInstance(remoteUrl))
        else
            errorHandler?.()
    }

    useEffect(() => {
        webSocketInstance.onerror = (event) => {
            console.log('Error', event.message);
            errorHandler?.()
        };
        webSocketInstance.onopen = () => {
            console.log("Socket open");
            openConnectionHandler?.()
        };

        webSocketInstance.onclose = () => {
            console.log("Socket closed");
            closedConnectionHandler?.()
        };
    }, [webSocketInstance])

    const sendMessage = (message) => {
        webSocketInstance.send(message)
    }

    return {
        sendMessage,
        setRemoteConnection,
    }
}
export default useWebSocketService

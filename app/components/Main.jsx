import React, {useState, useEffect} from "react";
import useWebSocketService from "../hooks/useWebSocketService";
import Trackpad from "./Trackpad";
import {StyleSheet, View} from "react-native";
import colors from "../constants/styling/colors";
import RemoteIpScanner from "./RemoteIpScanner";

const Main = () => {
    const [isConnected, setIsConnected] = useState(false)
    const [retryScan, setRetryScan] = useState(false)
    const openConnectionHandler = () => {
        setIsConnected(true)
    }

    const closedConnectionHandler = () => {
        setIsConnected(false)
    }
    const errorConnectionHandler = () => {
        setRetryScan(true)
    }
    const remoteMouseService = useWebSocketService(openConnectionHandler, closedConnectionHandler, errorConnectionHandler)

    const handleRemoteIpAddress = (data) => {
        setRetryScan(false)
        remoteMouseService.setRemoteConnection(data)
    }

    return (
        <View style={styles.container}>
                <>
                    {isConnected ? (
                        <Trackpad remoteMouseService={remoteMouseService}/>
                    ): (
                        <RemoteIpScanner scannedDataHandler={handleRemoteIpAddress} retry={retryScan}/>
                    )}
                </>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        color: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default Main
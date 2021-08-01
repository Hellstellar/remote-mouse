import React, {useState} from "react";
import useWebSocketService from "../hooks/useWebSocketService";
import Trackpad from "./Trackpad";
import {StyleSheet, View} from "react-native";
import colors from "../constants/styling/colors";
import RemoteIpScanner from "./RemoteIpScanner";
import {Slider} from 'react-native-elements';

const Main = () => {
    const [isConnected, setIsConnected] = useState(false)
    const [retryScan, setRetryScan] = useState(false)
    const [sensitivity, setSensitivity] = useState(3)
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

    const handleRemoteIpAddress = (remoteIpAddress) => {
        setRetryScan(false)
        remoteMouseService.setRemoteConnection(remoteIpAddress)
    }

    return (
        <View style={styles.container}>
                <>
                    {isConnected ? (
                        <>
                            <Trackpad remoteMouseService={remoteMouseService} sensitivity={sensitivity}/>
                            <Slider
                                style={{width: '80%'}}
                                value={sensitivity}
                                step={2}
                                minimumValue={1}
                                maximumValue={9}
                                minimumTrackTintColor={colors.primary}
                                thumbStyle={{backgroundColor: colors.primary, height: 20}}
                                onValueChange={(value) => setSensitivity(value)}
                            />
                        </>
                    ): (
                        <>
                            <RemoteIpScanner scannedDataHandler={handleRemoteIpAddress} retry={retryScan}/>
                        </>
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
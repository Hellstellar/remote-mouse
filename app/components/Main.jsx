import React, {useState} from "react";
import useWebSocketService from "../hooks/useWebSocketService";
import Trackpad from "./Trackpad";
import RemoteIpScanner from "./RemoteIpScanner";
import {Flex, Slider, SmallCloseIcon} from "native-base";


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
        <Flex flexGrow={1} bg="blueGray.900" color="emerald.300" align={"center"} justify={"center"}>
            {isConnected ? (
                <>
                    <SmallCloseIcon mb={2} mt={5} ml={2} alignSelf={"flex-start"} color={"red.500"}
                                    onPress={() => remoteMouseService.closeConnection()}/>
                    <Trackpad remoteMouseService={remoteMouseService} sensitivity={sensitivity}/>
                    <Slider
                        mt={5}
                        w={"80%"}
                        defaultValue={sensitivity}
                        step={0.5}
                        minValue={1}
                        maxValue={9}
                        onChange={(value) => setSensitivity(value)}
                    >
                        <Slider.Track>
                            <Slider.FilledTrack bg="emerald.300"/>
                        </Slider.Track>
                        <Slider.Thumb bg="emerald.300" h={"20px"} w={"40px"}/>
                    </Slider>
                </>
            ) : (
                <>
                    <RemoteIpScanner scannedDataHandler={handleRemoteIpAddress} retry={retryScan}/>
                </>
            )}
        </Flex>
    )
}
export default Main
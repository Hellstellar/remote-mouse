import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import {Button, Flex, Heading, List, Modal, QuestionIcon, Spacer, Text, WarningIcon} from "native-base";

const RemoteIpScanner = ({scannedDataHandler, retry}) => {
        const [hasPermission, setHasPermission] = useState(null);
        const [scanned, setScanned] = useState(false);
        const [showInfo, setShowInfo] = useState(false)

        useEffect(() => {
            (async () => {
                const {status} = await BarCodeScanner.requestPermissionsAsync();
                setHasPermission(status === 'granted');
            })();
        }, []);

        const handleBarCodeScanned = (event) => {
            console.log(event.data)
            setScanned(true);
            scannedDataHandler(event.data)
        };

        if (hasPermission === null) {
            return <Text color={"emerald.300"} fontSize="lg">Requesting for camera permission...</Text>;
        }
        if (hasPermission === false) {
            return <Text color={"red.500"} fontSize="lg">No access to camera</Text>;
        }

        return (
            <>

                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />

                <Flex direction={"column"} align={"center"} justify={"center"}>
                    <Text mt={20} pt={20} color={"emerald.300"} fontSize="lg">Scan QR code on desktop app.</Text>
                    <Spacer/>
                    {retry && scanned &&
                    <>
                        <Button bg={"emerald.300"} color={"blueGray.900"} onPress={() => setScanned(false)}>
                            <Text>
                                Tap to Scan Again
                            </Text>
                        </Button>
                        <Spacer/>
                        <WarningIcon color={"red.500"}/>
                        <Heading mt={2} color={"red.500"} fontSize="lg">Cannot find your device</Heading>

                    </>
                    }
                    <Button mt={2} bg={"emerald.300"} mb={16} onPress={() => setShowInfo(true)}><QuestionIcon
                        color={"blueGray.900"}/></Button>
                    <Modal isOpen={showInfo} onClose={() => setShowInfo(false)}>
                        <Modal.Content maxWidth="400px">
                            <Modal.CloseButton/>
                            <Modal.Header>Please ensure</Modal.Header>
                            <Modal.Body>
                                <List.Unordered>
                                    <List.Item mr={1}>You are connected to the same wireless network as your
                                        desktop/laptop.</List.Item>
                                    <List.Item mr={1}>You refresh the QR code by clicking on it if you changed the wireless
                                        network.</List.Item>
                                    <List.Item mr={1}>You are scanning the QR code visible on the Remote Mouse desktop
                                        app.</List.Item>
                                </List.Unordered>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button.Group variant="ghost">
                                    <Button
                                        onPress={() => {
                                            setShowInfo(false)
                                        }}
                                    >
                                        Got it
                                    </Button>
                                </Button.Group>
                            </Modal.Footer>
                        </Modal.Content>
                    </Modal>
                </Flex>
            </>
        );
    }
;
export default RemoteIpScanner
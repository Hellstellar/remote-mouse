import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import colors from "../constants/styling/colors";

const RemoteIpScanner = ({scannedDataHandler, retry}) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = (event) => {
        console.log(event.data)
        setScanned(true);
        scannedDataHandler(event.data)
    };

    if (hasPermission === null) {
        return <Text style={styles.text}>Requesting for camera permission...</Text>;
    }
    if (hasPermission === false) {
        return <Text style={styles.text}>No access to camera</Text>;
    }

    return (
        <>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            {retry && scanned &&
                <>
                    <Text style={styles.text}>Cannot find your device</Text>
                    <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
                </>
            }
        </>
    );
};
export default RemoteIpScanner

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    text: {
        color: colors.primary,
        fontSize: 19
    }
});
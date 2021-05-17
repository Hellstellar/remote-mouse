import {StyleSheet, View} from "react-native";
import React from "react";
import useTrackpadHandler from "../hooks/useTrackpadHandler";
import colors from "../constants/styling/colors";

const Trackpad = ({remoteMouseService}) => {
    const { onStartShouldSetResponder, handleTouchRelease, handleTrackpadMove } = useTrackpadHandler(remoteMouseService)

    return (
        <View
            onStartShouldSetResponder={event => onStartShouldSetResponder(event.nativeEvent)}
            onResponderMove={event => handleTrackpadMove(event.nativeEvent)}
            onResponderRelease={event => handleTouchRelease(event.nativeEvent)}
            style={styles.trackpad}>
        </View>
    )
}

const styles = StyleSheet.create({
    trackpad: {
        width: '100%',
        height: '80%',
        borderColor: colors.primary,
        borderWidth: 3,
        borderRadius: 20,
    }
});
export default Trackpad
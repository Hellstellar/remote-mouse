import React, {useEffect, useState} from 'react';
import { StyleSheet, View} from 'react-native';
import RemoteMouseService from './app/services/remote-mouse-service'
import getWebSocketInstance from "./app/services/web-socket-instance";
import useTrackpadHandler from "./app/hooks/useTrackpadHandler";

const App = () => {

  const [remoteMouseService, setRemoteMouseService] = useState();
  const { handleTouchRelease, handleTrackpadTouch } = useTrackpadHandler(remoteMouseService)

  useEffect(() => {
    const webSocketInstance = getWebSocketInstance("http://192.168.1.13:4444/?clientName=MobileClient")
    setRemoteMouseService(RemoteMouseService(webSocketInstance));
  }, [])

  useEffect(() => {
    if(remoteMouseService)
      remoteMouseService.start();
  },[remoteMouseService])


  return (
    <View style={styles.container}>

      {remoteMouseService &&
          <View
              onStartShouldSetResponder={() => true}
              onResponderMove={evt => handleTrackpadTouch(evt.nativeEvent)}
              onResponderRelease={handleTouchRelease}
              style={styles.trackpad}>
          </View>
      }
    </View>
  );
}
export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#12151F',
    color: '#05F4B7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trackpad: {
    width: '100%',
    height: '80%',
    borderColor: '#05F4B7',
    borderWidth: 3,
    borderRadius: 20,
  }
});

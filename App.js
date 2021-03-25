import React, {useEffect, useState} from 'react';
import { StyleSheet, View} from 'react-native';
import RemoteMouseService from './services/remote-mouse-service'
import getWebSocketInstance from "./services/web-socket-instance";

const App = () => {

  const [remoteMouseService, setRemoteMouseService] = useState();

  useEffect(() => {
    const webSocketInstance = getWebSocketInstance("http://10.0.2.2:4444/?clientName=MobileClient")
    setRemoteMouseService(RemoteMouseService(webSocketInstance));
  }, [])

  useEffect(() => {
    if(remoteMouseService)
      remoteMouseService.start();
  },[remoteMouseService])

  const handleTrackpadTouch = event => {
    const location = `${event.nativeEvent.locationX} ${event.nativeEvent.locationY}`
    remoteMouseService.sendMessage(location)
  }

  return (
    <View style={styles.container}>

      {remoteMouseService &&

          <View
              onStartShouldSetResponder={() => true}
              onResponderMove={(evt) => handleTrackpadTouch(evt)}
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
    width: '90%',
    height: '70%',
    borderColor: '#05F4B7',
    borderWidth: 3,
    borderRadius: 20,
  }
});

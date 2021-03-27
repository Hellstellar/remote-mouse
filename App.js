import React, {useEffect, useState} from 'react';
import { StyleSheet, View} from 'react-native';
import RemoteMouseService from './services/remote-mouse-service'
import getWebSocketInstance from "./services/web-socket-instance";
//import debounce from 'lodash.debounce';

const App = () => {

  const [remoteMouseService, setRemoteMouseService] = useState();
  let prevPositionX = 0;
  let prevPositionY = 0;
  let isTouched = false

  useEffect(() => {
    const webSocketInstance = getWebSocketInstance("http://192.168.1.11:4444/?clientName=MobileClient")
    setRemoteMouseService(RemoteMouseService(webSocketInstance));
  }, [])

  useEffect(() => {
    if(remoteMouseService)
      remoteMouseService.start();
  },[remoteMouseService])

  const getDeltaPositionXY = ({locationX, locationY}) => {
    const currentPositionX = (locationX).toFixed()
    const currentPositionY = (locationY).toFixed()
    const deltaX = currentPositionX - prevPositionX
    const deltaY = currentPositionY - prevPositionY
    prevPositionX = currentPositionX
    prevPositionY = currentPositionY
    if(!isTouched) {
      isTouched = true;
      return [0, 0]
    }
    return [deltaX, deltaY];
  };


  const handleTrackpadTouch = nativeEvent => {
    const [deltaX, deltaY] = getDeltaPositionXY(nativeEvent);
    const location = `${deltaX} ${deltaY}`
    remoteMouseService.sendMessage(location)
  }

  const handleTouchRelease = () => {
    console.log('release')
    isTouched = false
    prevPositionX = 0;
    prevPositionY = 0;
  }

  //const delayedHandleTouchMove = debounce(event => handleTrackpadTouch(event), 10);


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
    width: '90%',
    height: '70%',
    borderColor: '#05F4B7',
    borderWidth: 3,
    borderRadius: 20,
  }
});

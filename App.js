import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import RemoteMouseService from './services/remote-mouse-service'
import getWebSocketInstance from "./services/web-socket-instance";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { connected: false };
  }

  componentDidMount() {
    const webSocketInstance = getWebSocketInstance("http://10.0.2.2:4444/")
    const remoteMouseService = RemoteMouseService(webSocketInstance)
    this.setState({remoteMouseService}, () => {
      this.state.remoteMouseService.start();
    })

  }

  handleSendMessage = message => {
    this.state.remoteMouseService.sendMessage(message)
  }

  render() {
    const { remoteMouseService } = this.state;
    return (
      <View style={styles.container}>
        <Text>Remote mouse client</Text>

        {remoteMouseService && <Button
          title = 'Connect'
          onPress = { () => this.handleSendMessage("hello") } />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

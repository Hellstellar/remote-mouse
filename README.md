# remote-mouse-mobile

Control your mouse with mobile device

## Try the app

### Steps to run the app

#### Download Desktop app

- Download the latest release
  of [remote-mouse-server](https://github.com/Hellstellar/remote-mouse-server/releases/download/v0.5.0-alpha/Remote.Mouse-darwin-x64-0.5.0.zip)
  .

#### Download Mobile app

- Download the [Expo go Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_IN&gl=US) /
  [Expo go IOS](https://apps.apple.com/us/app/expo-go/id982107779) on your mobile.

#### Run Desktop app

- Unzip the downloaded file and move it to applications.
- Run this file by double-clicking on it.
- Provide necessary permissions to run the app.
- You will see the remote mouse icon on the menu bar.
- Click on it to see the QR-code.

#### Run Mobile app

- Go to https://expo.dev/@hellstellar/remote-mouse and scan the QR code using the Expo Go app.
- Remote mouse mobile will run on your mobile.

#### Start controlling your mouse

- Scan the QR code on the desktop app with the remote mouse mobile app.
- You will be connected, and you can start controlling your mouse from the trackpad visible on your phone.

## For devs

### Requirements

- Yarn
- [Remote mouse server](https://github.com/Hellstellar/remote-mouse-server)

### Get started

1. Make sure your mobile device and PC/laptop are connected to the same wifi network.
2. Start `Remote Mouse Server` by following the instructions in the ReadMe from the link above.
3. Run `yarn install`
4. Run `yarn start`
5. The expo client will open on your browser
6. Download the `expo go` app on your mobile
7. Scan the QR code on your browser from the app
8. Your app will be started on mobile

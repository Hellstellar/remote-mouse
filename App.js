import React from 'react';
import Main from "./app/components/Main";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";

const App = () => {
  return (
      <NativeBaseProvider>
          <Main/>
      </NativeBaseProvider>
  );
}
export default App



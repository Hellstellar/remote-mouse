import React from 'react';
import Main from "./app/components/Main";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {extendTheme} from "native-base";


const colorTheme = {
    blueGray: {
        900: '#12151F',
    },
    emerald: {
        300: '#05F4B7',
    }
};
const theme = extendTheme({colors: colorTheme});

const App = () => {
    return (
        <NativeBaseProvider theme={theme}>
            <Main/>
        </NativeBaseProvider>
    );
}
export default App



import ReactDOM from "react-dom"
import { StrictMode } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import { FirebaseAppProvider } from "reactfire"
import App from "./App"
import theme from "./theme"
import FirebaseComponentsProvider from "./ContextProviders/FirebaseComponentsProvider"

const firebaseConfig = {
  apiKey: "AIzaSyAtDkJ25eyhVCp4cqnMSBEEQzj6GXKF9B4",
  authDomain: "mathflow-45dc3.firebaseapp.com",
  projectId: "mathflow-45dc3",
  storageBucket: "mathflow-45dc3.appspot.com",
  messagingSenderId: "917510915167",
  appId: "1:917510915167:web:4f866d3f4fffbdcf4247ea",
  measurementId: "G-MC4191EJYQ",
}

ReactDOM.render(
  <StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <FirebaseComponentsProvider>
        <Router>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <ChakraProvider>
            <App />
          </ChakraProvider>
        </Router>
      </FirebaseComponentsProvider>
    </FirebaseAppProvider>
  </StrictMode>,
  document.getElementById("root")
)

import ReactDOM from "react-dom"
import { StrictMode } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { ColorModeScript } from "@chakra-ui/react"
import App from "./App"
import theme from "./theme"

ReactDOM.render(
  <StrictMode>
    <Router>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </Router>
  </StrictMode>,
  document.getElementById("root")
)

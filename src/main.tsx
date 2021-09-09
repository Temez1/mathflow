import ReactDOM from "react-dom"
import { StrictMode } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import App from "./App"

ReactDOM.render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
  document.getElementById("root")
)

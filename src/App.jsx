import Country from "./Country"
import CountryList from "./CountryList"
import { BrowserRouter as Router,Routes,Route,useNavigate } from "react-router-dom"
import Detail from "./Detail"
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Country/>}/>
        <Route path="/detail" element={<Detail/>}/>

      </Routes>
    </Router>
  )
}

export default App

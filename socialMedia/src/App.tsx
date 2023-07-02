import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path='/'/>
          </Routes>
        </Router>
      </div>
      <h1>Hiii</h1>
    </>
  )
}

export default App

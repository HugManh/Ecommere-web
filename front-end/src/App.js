import { BrowserRouter as Router } from "react-router-dom";
// import { DataProvider } from "./GlobalState";
import Header from "./components/headers/Header";
import MainPages from "./components/mainpages/Pages";

function App() {
  return (
    <Router>
      <div className='App'>
        <Header />
        <MainPages />
      </div>
    </Router>
  );
}

export default App;

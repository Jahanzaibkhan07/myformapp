import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import FormComponent from "./pages/FormComponent";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<FormComponent />} />
          </Routes>
        </Container>
      </main>
    </Router>
  );
}

export default App;

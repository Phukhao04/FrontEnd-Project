import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Todolist from "./Todolist";
import TaskList from "./Tasklist";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/todolist" element={<Todolist />} />
        <Route path="/tasklist" element={<TaskList />} />
      </Routes>
    </Router>
  );
}

export default App;

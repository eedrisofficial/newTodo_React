import { Route, Routes } from "react-router";
import TodoDashboard from "./Pages/TodoDashboard";
import TodoPreview from "./Pages/TodoPreview";

function App() {
  return (
    <Routes>
      <Route path="/" element={<TodoDashboard />} />
      <Route path="/todo/:todo_id" element={<TodoPreview />} />
    </Routes>
  );
}

export default App;

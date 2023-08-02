import "./App.css";
import SubscriptionForm from "./components/SubscriptionForm";
import SubscriptionList from "./components/SubscriptionList";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SubscriptionForm />}>
        </Route>
        <Route path="/List" element={<SubscriptionList />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

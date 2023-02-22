import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import OnBoard from "./components/OnBoard";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import PhoneSignUp from "./components/PhoneSignUp";

function App() {
  return (
    <UserAuthContextProvider>
      <Routes>
        <Route exact path="/" element={<Login />}></Route>
        <Route exact path="/signup" element={<SignUp />}></Route>
        <Route exact path="/phonesignup" element={<PhoneSignUp />}></Route>

        <Route
          exact
          path="/onboard"
          element={
            <ProtectedRoute>
              <OnBoard />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </UserAuthContextProvider>
  );
}

export default App;

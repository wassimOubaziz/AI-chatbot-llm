import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Signup from "./Pages/Signup/Signup";
import SignIn from "./Pages/signin/SignIn";
import Patient from "./Pages/patient/Patient";
import Sessions from "./Pages/sessions/Sessions";
import Messaging from "./Pages/messaging/Messaging";
import Users from "./Pages/doctor/users/Users";
import PatientD from "./Pages/patientD/PatientD";
import SessionsD from "./Pages/sessionsD/SessionD";
import OCRComponent from "./Pages/ocr/OCRComponent";
import ChatGPT from "./Pages/ocr/ChatGPT";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="signup" exact element={<Signup />} />
        <Route path="login" exact element={<SignIn />} />

        <Route path="patient" element={<Patient />}>
          <Route path="sessions" element={<Sessions />} />
          <Route path="messaging/:id" element={<Messaging />} />
        </Route>

        <Route path="ocr" element={<OCRComponent />} />
        <Route path="gpt" element={<ChatGPT />} />

        <Route path="doctor" exact element={<Users />}>
          <Route path="patient/:id" element={<PatientD />} />
          <Route path="sessions/:id" element={<SessionsD />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

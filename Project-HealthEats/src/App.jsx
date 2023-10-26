import { useState, useContext, createContext } from "react";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Detector } from "./components/Detector";
import { Scanner } from "./components/Scanner";
import { Profile } from "./components/Profile";
import { Register } from "./components/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Nav } from "./components/Nav/Nav";

const Context = createContext();

export const useAppContext = () => {
  return useContext(Context);
};

function App() {
  const [value1, setValue1] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState(null); // State for Date of Birth
  const [age, setAge] = useState(null); // State for Age
  return (
    <div>
      <Context.Provider
        value={{
          name,
          setName,
          email,
          setEmail,
          pass,
          setPass,
          value1,
          setValue1,
          dob,
          setDob,
          age,
          setAge,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/detector" element={<Detector />} />
            <Route path="/scanner" element={<Scanner />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </Context.Provider>
    </div>
  );
}

export default App;

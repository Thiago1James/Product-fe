import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Global from "./assets/styles/global";
import HeaderComponent from "./components/header";
import { AuthProvider } from "./contexts/Auth";
import Router from "./Routes";

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <AuthProvider>
        <Global />
        <HeaderComponent user={user} setUser={setUser} />
        <Router user={user} setUser={setUser} />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

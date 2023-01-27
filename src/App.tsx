import React, { useState } from "react";
import Login from "./components/userLogin/Login";

const App: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  /*   const domain = process.env.AUTH0_DOMAIN || ''
  const clientId = process.env.AUTH0_CLIENT_ID || '' */

  return (
    <div>
      <Login
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
    </div>
  );
};

export default App;

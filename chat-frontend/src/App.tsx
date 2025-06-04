import {Refine } from "@refinedev/core";
import {
  notificationProvider,
  ThemedLayoutV2,
  ErrorComponent,
} from "@refinedev/antd";
import routerProvider from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { ConfigProvider } from "antd";
import "@refinedev/antd/dist/reset.css";

import { Login } from "./pages/login";

import { authProvider } from "./auth/auth_provider";
import { Landing } from "./pages/landing";
import { Register } from "./pages/register";
import { Chat } from "./pages/chat";
import { Authenticated } from "@refinedev/core";
import Lay from "./components/layout";
import { SomePage } from "./pages/some";

function App() {

  return (
    <BrowserRouter>
      <ConfigProvider>
        <Refine
          routerProvider={routerProvider}
          authProvider={authProvider}
          notificationProvider={notificationProvider}
          Layout={ThemedLayoutV2}
          catchAll={<ErrorComponent />}
        >
          <Routes>
            <Route path="/" element={<Landing />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />

          <Route
          path="/"
          element={
            <Authenticated v3LegacyAuthProviderCompatible={true} key="auth">
              <Lay/>
            </Authenticated>
          }>
            <Route path="users" element={<SomePage/>} />
            <Route path="chat/:userId" element={<Chat />} />

          </Route>

          </Routes>
        </Refine>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;

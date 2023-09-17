import "@styles/globals.css";

import Employee from "@models/employee";
import Request from "@models/request";
import { ModalProvider } from "./ModalContext";

import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
  title: "Employee Dashboard",
  description: "Manage Your Employees Conveniently",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <ModalProvider>
            <div className="main">
              <div className="gradient" />
            </div>
            <main className="app">
              <Nav />
              {children}
            </main>
          </ModalProvider>
        </Provider>
        <div id="modal-root"></div>
      </body>
    </html>
  );
};

export default RootLayout;

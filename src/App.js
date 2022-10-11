import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Contactlist from "./components/Contactlist";
import Editcontact from "./components/Editcontact";

import Addcontact from "./components/Addcontact";

function App() {
  return (
    <BrowserRouter>
      <>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Navigate to={"/contact-list"} />} />
          <Route exact path="/contact-list" element={<Contactlist />} />
          <Route exact path="/add-contact" element={<Addcontact />} />

          <Route
            exact
            path="/edit-contact/:contactId"
            element={<Editcontact />}
          />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Map from "../components/map/Map";
import InfoPage from "../components/infoPage/InfoPage";

const AppRouter = () => {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Map />} />
            <Route path=":restourantId" element={<InfoPage />} />
         </Routes>
      </BrowserRouter>
   );
};

export default AppRouter;

import React from "react";
import { About, Home, NotFound } from "pages/index.tsx";
import { Route, Routes } from "react-router-dom";

const routes = (
    <Routes>
        <Route index element={<Home name="World" />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
    </Routes>
);

export { routes };

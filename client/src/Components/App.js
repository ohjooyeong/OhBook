import React, { Suspense } from "react";
import Router from "./Router";
import GlobalStyles from "./GlobalStyles";

function App() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Router />
            <GlobalStyles />
        </Suspense>
    );
}

export default App;

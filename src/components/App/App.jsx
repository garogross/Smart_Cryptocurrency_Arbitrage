import React from "react";
import {useDispatch} from "react-redux";
import { Route, Routes} from 'react-router-dom';
import {routes} from "../../router/path";

function App() {

    return (
        <>
            {/*<Navbar/>*/}
            <Routes>
                {
                    routes.map(({path,component},index) => (
                        <Route path={path} element={component} key={index}/>
                    ))
                }
            </Routes>
        </>
    );
}

export default App;
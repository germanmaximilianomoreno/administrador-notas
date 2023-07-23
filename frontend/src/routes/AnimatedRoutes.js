import { Route, Routes } from "react-router-dom";
import Error from "../containers/errors/Error";
import Home from "../containers/pages/Home";

function AnimatedRoutes() {
    return (
        <Routes>
            <Route path='*' element={<Error/>}></Route>
            <Route path='/' element={<Home/>}></Route>
        </Routes>
    )
}

export default AnimatedRoutes;
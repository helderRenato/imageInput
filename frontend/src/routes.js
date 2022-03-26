import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from "./Pages/Home/index";

export default function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element = {<Home/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}
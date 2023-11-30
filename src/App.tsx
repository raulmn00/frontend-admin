import { Route, Routes, Link } from 'react-router-dom';
import Private from "./pages/Private.tsx";
import Home from "./pages/Home.tsx";
import { RequireAuth } from './contexts/auth/RequireAuth';
import Login from "./pages/Login.tsx";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<RequireAuth><Home /> </RequireAuth>} />
                <Route path="/login" element={<Login/> }/>
                <Route path="/private" element={<RequireAuth><Private /></RequireAuth>} />
            </Routes>
        </div>
    );
}

export default App;
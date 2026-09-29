import { useEffect } from "react";
import { apiFetch } from "./services/api";

function App() {
    useEffect(() => {
        apiFetch("/")
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            <h1>Movie Tracker</h1>
            <p>Frontend is running.</p>
        </div>
    );
}

export default App;
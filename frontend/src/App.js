import './App.css';
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import {Route, Switch} from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Switch>
                <Route exact path="/login" component={LoginPage}/>
                <Route exact path="/signup" component={SignupPage}/>
            </Switch>
        </div>
    );
}

export default App;

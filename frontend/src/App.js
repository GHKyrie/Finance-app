import './App.css';
import SignupPage from "./pages/SignupPage/SignupPage";
import {Route, Switch} from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import LoginFormik from "./pages/LoginPage/LoginFormik";

function App() {
    return (
        <div className="App">
            <Switch>
                <Route exact path="/signup" component={SignupPage}/>
                <Route exact path="/login" component={LoginFormik}/>
                <Route exact path="/app" component={MainPage}/>
                <Route path="/" component={LoginFormik}/>
            </Switch>
        </div>
    );
}

export default App;

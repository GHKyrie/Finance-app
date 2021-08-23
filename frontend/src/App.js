import './App.css';
import {Route, Switch} from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";

function App() {
    return (
        <div className="App">
            <Switch>
                <Route exact path="/signup" component={SignupPage}/>
                <Route exact path="/login" component={LoginPage}/>
                <Route exact path="/app" component={MainPage}/>
                <Route path="/" component={LoginPage}/>
            </Switch>
        </div>
    );
}

export default App;

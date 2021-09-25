import './App.css';
import {Route, Switch} from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import TransactionsPage from "./pages/TransactionsPage/TransactionsPage";
import Modal from "./pages/TransactionsPage/Modal/Modal";

function App() {
    return (
        <div className="App">
            <Switch>
                <Route exact path="/signup" component={SignupPage}/>
                <Route exact path="/login" component={LoginPage}/>
                <Route exact path="/app" component={MainPage}/>
                <Route exact path="/transactions">
                    <TransactionsPage type={"all"}/>
                </Route>
                <Route exact path="/transactionsexin">
                    <TransactionsPage type={"exin"}/>
                </Route>
                <Route exact path="/addtransaction" component={Modal}/>
                <Route path="/" component={LoginPage}/>
            </Switch>
        </div>
    );
}

export default App;

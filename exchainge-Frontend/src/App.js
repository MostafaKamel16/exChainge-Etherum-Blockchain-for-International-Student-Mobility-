import './App.css';
import {
    Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Verify from './views/Verify';
import LoginView from "./views/LoginView";
import reducers from "./redux/reducers";
import thunkMiddleware from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import Landing from "./views/Landing";
import signupView from "./views/SignupView";
import Upload from "./views/Upload";
import VerifyView from "./views/VerifyView";
import Timeline from "./views/Timeline";
import PrivateRoute from "./auth/PrivateRoute"
import {createBrowserHistory} from "history";
import Explorer from './views/Explorer';
import BatchSend from './views/BatchSend'

function App() {
    // create store for redux
    const store = createStore(reducers, applyMiddleware(thunkMiddleware));
    var hist = createBrowserHistory();

  return (
      <div>
          <Provider store={store}>
            <Router history={hist}>
                <Switch>
                <Route exact path="/" component={Landing} />
                    <PrivateRoute exact path="/upload" component={Upload} />
                    <Route exact path="/login" component={LoginView} />
                    <Route exact path="/signup" component={signupView} />
                    <PrivateRoute exact path="/verify_timeline" component={Verify} />
                    <PrivateRoute exact path="/verify" component={VerifyView} />
                    <PrivateRoute exact path="/timeline" component={Timeline}/>
                    <PrivateRoute exact path="/explorer" component={Explorer} />
                    <PrivateRoute exact path="/universities" component={BatchSend} />
                    <Route render={() => <Redirect to='/' />} />
                    {/*<Route exact path="/register" component={RegisterView} />*/}
                </Switch>
            </Router>
          </Provider>
      </div>
          );
}

export default App;

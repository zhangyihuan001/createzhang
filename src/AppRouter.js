
import {BrowserRouter as Router ,Route,Switch} from "react-router-dom"
import {Provider} from "react-redux"
import { store } from "./store";
import { Index } from "./Index";


export let AppRouter =props=>(
    <Provider store={store}>
        <Router>
                <Route path="/" component={Index} />
        </Router>
    </Provider>
)
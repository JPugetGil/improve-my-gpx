import React, {Suspense} from 'react';
import './App.css';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import routes from './routes';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {library} from '@fortawesome/fontawesome-svg-core';
import {connect} from 'react-redux';
import icons from './fontLibrary';
// import {toggleSidebar} from './actions/appAction' // Import needed actions here

library.add(...icons);

function App(props) {
    /*const changeDrawer = () => {
        props.dispatch(toggleSidebar()); // call the action
    };*/


    return (
        <Router>
            {routes.map((route, index) => (
                <Suspense key={index} fallback={'LOADING...'}>
                    <Route
                        path={route.path}
                        exact={route.exact}
                        component={route.main}
                    />
                </Suspense>
            ))}
        </Router>
    );
}

const mapStateToProps = (state) => ({
    state: state
});

export default connect(mapStateToProps)(App);

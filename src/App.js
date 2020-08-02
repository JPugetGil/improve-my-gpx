import React, { Suspense } from 'react'
import './App.scss'
import 'react-bulma-components/dist/react-bulma-components.min.css'
import routes from './routes'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { connect } from 'react-redux'
import icons from './fontLibrary'
import Loading from './layouts/Loading'

const Page404 = React.lazy(() => import('./layouts/Page404'))
// import {toggleSidebar} from './actions/appAction' // Import needed actions here

library.add(...icons)

function App (props) {
    /*const changeDrawer = () => {
        props.dispatch(toggleSidebar()); // call the action
    };*/

    return (
        <Router>
            {routes.map((route, index) => (
                <Suspense key={index} fallback={<Loading/>}>
                    <Route
                        path={route.path}
                        exact={route.exact}
                        component={route.main}
                    />
                </Suspense>
            ))}
            {
                routes.findIndex((route) => route.path === props.state.router.location.pathname) < 0 ?
                    (
                        <Suspense fallback={'LOADING...'}>
                            <Route component={Page404}/>
                        </Suspense>
                    ) : null
            }
        </Router>
    );
}

const mapStateToProps = (state) => ({
    state: state
});

export default connect(mapStateToProps)(App);

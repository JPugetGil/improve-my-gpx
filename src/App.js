import React, { Suspense } from 'react';
import './App.css';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import routes from './routes';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
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

export default App;

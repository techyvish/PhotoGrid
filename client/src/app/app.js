import React from 'react';
var ReactDOM = require('react-dom');
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './Main'; // Our custom react component
var { Route, Router, IndexRoute, hashHistory } = require('react-router'); // Object destructing syntex

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
//render(<Main />, document.getElementById('app'));

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Main}>
            {/*<Route path="about" component={About}/>*/}
            {/*<Route path="examples" component={Examples}/>*/}
            {/*<IndexRoute component={Weather}/>*/}
        </Route>
    </Router>,
    document.getElementById('app')
)


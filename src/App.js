import './App.scss';
import Menu from './components/Menu';
import Footer from './components/Footer';
import Diagnostic from './pages/Diagnostic';
import MyInterviews from './pages/MyInterviews'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="app">
        <Menu />
          <div className="body">
            <Switch>
              <Route path="/mis-entrevistas">
                <MyInterviews />
              </Route>

              <Route path="/">
                <Diagnostic></Diagnostic>
              </Route>
            </Switch>
          </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

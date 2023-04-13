//import './App.css';
import { Route } from 'react-router-dom';
import LandingPage from './Component/Landing/Landing.jsx';
import Inicio from './Component/Home/Inicio.jsx';
import Detail from './Component/Detail/Detail.jsx';
import Create from './Component/CreateRecete/creates.jsx';
import { Switch } from 'react-router-dom';
import About from './Component/About/About';
import NavBar from './Component/NavBar/NavBar.jsx';
import Page404 from './Component/404/PageNotFound.jsx';
function App() {
  return (
    <div className="App">
        <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/home" component={Inicio} />
            <Route exact path="/home/:id" component={Detail} />
            <Route exact path="/about" component={About} />
            <Route exact path="/create" component={Create} />
            <Route exact path="/nav" component={NavBar} />
            <Route path= '/*' component={Page404} />
      </Switch>
    </div>
  );
}

export default App;

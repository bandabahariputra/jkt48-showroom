import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import RoomDetails from './RoomDetails';

const App = () => (
  <div className="min-h-screen bg-slate-800 text-neutral-100 relative selection:bg-neutral-300 selection:text-slate-800">
    <Router>
      <Header />
      <div className="max-w-4xl mx-auto px-6 pt-8 pb-32">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/room/:id">
            <RoomDetails />
          </Route>
        </Switch>
      </div>
      <Footer />
    </Router>
  </div>
);

export default App;

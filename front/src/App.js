import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import CreateEvent from "./components/CreateEvent";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import ResponseForm from './components/ResponseForm';
import AdminDash from "./components/AdminDash";
import EventDash from "./components/EventDash";
import { Provider } from 'react-redux';
import store, { persistor } from './context/store';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className="app">
           <Header />
            <Router>
              <Route path="/create" component={CreateEvent}></Route>
              <Route path="/" exact component={Dashboard}></Route>
              <Route path="/event/:id/" component={EventDash}></Route>
              <Route path="/admin" component={AdminDash}></Route>
            </Router>			
           </div>
        </PersistGate>
      </Provider>

 );	
}

export default App;

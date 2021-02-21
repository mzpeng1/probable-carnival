import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import CreateEvent from "./components/CreateEvent";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import ResponseForm from './components/ResponseForm';
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
              <Route path="/response" exact component={ResponseForm}></Route>
            </Router>			
           </div>
        </PersistGate>
      </Provider>

 );	
}

export default App;

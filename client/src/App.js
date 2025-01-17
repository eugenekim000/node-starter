import React from 'react';
import './App.css';
import CourseCard from './components/CourseCard';
import NotFound from './components/NotFound';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/courses/:id' component={CourseCard} />
        <Route exact path='/Not-Found' component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

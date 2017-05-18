import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import DeceasedsListPage from './container/deceaseds-list-page';
import DeceasedsFormPage from './container/deceaseds-form-page';




// routes for entire application


class App extends Component {
  render() {
    return (
      <Container>
        <div className="ui two item menu ">
          <NavLink className="item navigationHead"  activeClassName="active" exact to="/">Home</NavLink>
          <NavLink className="item navigationHead" activeClassName="active" exact to="/deceaseds/new">Add New</NavLink>
        </div>
        <Route exact path="/" component={DeceasedsListPage}/>
        <Route path="/deceaseds/new" component={DeceasedsFormPage}/>
        <Route path="/deceased/edit/:_id" component={DeceasedsFormPage}/>
      </Container>
    );
  }
}

export default App;

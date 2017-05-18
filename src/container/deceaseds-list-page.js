import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Message, Card, Loader} from 'semantic-ui-react';
import DeceasedCard from '../components/deceased-card';
import { fetchDeceaseds, deleteDeceased} from "../actions/deceaseds-actions"

class DeceasedsListPage extends Component {

// GET request Deceaseds Details asynchronously from api

  componentDidMount = () => {
    this.props.fetchDeceaseds()
  }

// Function to spilt each deceased Details

  createDeceasedCards(deceaseds) {
    
      return (

<DeceasedCard deceaseds={this.props.deceaseds} deleteDeceased={this.props.deleteDeceased} />

  )

  }

  render() {

    //  Server side error messages
    const errorMessage = (
      <Message negative>
        <Message.Header>SERVER ERROR!</Message.Header>
        <p>Caused by: {this.props.serverError}</p>
      </Message>
    );

    const DeceasedList = (
      <Card.Group>
        {this.createDeceasedCards()}
      </Card.Group>
    )
    return (
      <div>
        <h1 style={{marginTop:"1em"}}>Deceaseds List</h1>
        { this.props.fetching ? <Loader active/> : ''}
        { this.props.serverError ? errorMessage : DeceasedList }
      </div>
    )
  }
}

// passing state props from store to conatiner

function mapStateToProps(state) {
  return {
    deceaseds: state.deceasedStore.deceaseds,
    serverError: state.deceasedStore.serverError,
    fetching: state.deceasedStore.fetching,
    fetched : state.deceasedStore.fetched
  }
}
//connect container state to store
export default connect(mapStateToProps, {fetchDeceaseds, deleteDeceased})(DeceasedsListPage);

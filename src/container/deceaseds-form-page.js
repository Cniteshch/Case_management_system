import React, { Component } from 'react';
import DeceasedForm from '../components/deceased-form';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { SubmissionError } from 'redux-form';
import _ from 'lodash';
import { newDeceased, saveDeceased, fetchDeceased, updateDeceased, validateContactFailed } from '../actions/deceaseds-actions';

class DeceasedsFormPage extends Component {

// initial redirect false

  state = {
    redirect: false
  }

// Based on event handler
// IF _id is present, then FetchDeceased() function is called to get deceased details from api to edit details.
// IF _id = null, newDeceased() is called and form is initiated for new Entry.

  componentDidMount = () => {
    const { _id } = this.props.match.params;
    if(_id){
      this.props.fetchDeceased(_id);
     

    } else {
      this.props.newDeceased();
      
    }
  }

// Same form is reused for edit as well as new Deceased Entry
// If Deceased_id is not available saveDeceased() is called from actions to Create new entry 
// else Deceased_id is available updateDeceased() is called to Update Details


// on submit form handler

  submit = (deceased) => {
    if(!deceased._id) {
      return this.props.saveDeceased(deceased)
        .then(response => this.setState({ redirect:true }))
        .catch(err => {
           throw new SubmissionError(this.props.errors)
         })
    } else {
      return this.props.updateDeceased(deceased)
        .then(response => this.setState({ redirect:true }))
        .catch(err => {
           throw new SubmissionError(this.props.errors)
         })
    }
  }


// render Deceased Form component 
// Redirect to home on successful Post or Update Details.

  render() {
    return (
      <div>
        {
          this.state.redirect ?
          <Redirect to="/" /> :
          <DeceasedForm deceased={this.props.deceased} errorMessage={this.props.errorMessage} errors={this.props.errors} loading={this.props.loading} onSubmit={this.submit} />
        }
      </div>
    )
  }
}


// passing state props from store to conatiner

function mapStateToProps(state) {
  return {
    deceased: state.deceasedStore.deceased,
    errorMessage: state.deceasedStore.errorMessage,
    errors: state.deceasedStore.errors,
    loading: state.deceasedStore.loading
  }
}
//connect container state to store

export default connect(mapStateToProps, {newDeceased, saveDeceased, fetchDeceased, updateDeceased, validateContactFailed }) (DeceasedsFormPage);

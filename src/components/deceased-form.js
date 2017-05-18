import React, { Component } from 'react';
import { Form, Grid } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { renderField, renderDatePicker, renderDropDown, renderContactWay } from './shared-component.js'
import _ from 'lodash';
import FormButton from '../shared/button.js';  



// schema for Deceased Details to get labels for validations messages for redux forms

const schema = {
  deceased: {
    nested: true,
    first_name: {
      label: "First Name",
      required: true
    },
    last_name: {
      label: "Last Name",
      required: true
    },
    address: {
    label: "Address",
      required: true
  },
  date_death: {
    label: "Date of Death",
      required: true
  }
  },
  
  customer : {
    nested: true,
    first_name: {
      label: "First Name",
      required: true
    },
    last_name: {
      label: "Last Name",
      required: true
    },

    phone: {
    label: "Phone",
    required: true,
    validator: (value) => { return /^\+(?:[0-9] ?){6,14}[0-9]$/.test(value) ? '' : 'Invalid international Phone No.' }
  },
  time_contact: {
      label: "Best time to Contact",
      required: true
    },
    contact_way: {
      label: "Best Cntact way",
      required: true
    },
},
  burial_type: {
    label: "Burial Type",
    required: true
}
}

// Input Field Validation

const validateField = (type, field, value) => {
  if(type.required && !value ) {
    return {[field] : {
      message: `You need to provide ${type.label}`
    }}
  }
  if(type.validator && value && type.validator(value)) {
    return {[field] : {
      message: type.validator(value)
    }}
  }
  return {}
}

const validate = (values) => {
  let errors = {deceased: {}}
  _.each(schema, (type, field) => {
    if(type.nested){
      const nestedSchema = _.omit(type,'nested')
      _.each(nestedSchema, (ntype, nfield) => {
          const nvalue = values[field] ? values[field][nfield] : null
          const nerror = validateField(ntype, nfield, nvalue)
          errors[field] = Object.assign({}, errors[field], nerror )
      })
    } else {
      errors = Object.assign({}, errors, validateField(type, field, values[field]))
    }
  })
  return errors;
}


// Deceased Form Component

class DeceasedForm extends Component {

// Load Deceased details Asynchronously
  componentWillReceiveProps = (nextProps) => {
    const { deceased } = nextProps;
    // Initialize form only once
    if(deceased._id !== this.props.deceased._id) {
      this.props.initialize(deceased)
    }
  }

// render the form 

  render() {
    const { handleSubmit, loading  } = this.props;

    return (
      <Grid centered columns={2}>
        <Grid.Column>
          <h1 style={{marginTop:"2em", color:"#3f51b5"}}>Add/Edit Deceased Details</h1>
          <Form onSubmit={handleSubmit} loading={loading}>
          
            
             <h2 style={{margin:"2em"}}> Deceased's Details </h2>

             <Field name="deceased.first_name" type="text" component={renderField} label="Name"/>
             <Field name="deceased.last_name" type="text" component={renderField} label="Surname"/>
            
              <Field name="deceased.address" type="text" component={renderField} label="address"/>
              <Field name="deceased.date_death"   type="text" component={renderDatePicker} label="date of death"/>


              <h2 style={{margin:"2em"}}> Customer's Details </h2>

              <Field name="customer.first_name" type="text" component={renderField} label="Customer Name"/>
              <Field name="customer.last_name" type="text" component={renderField} label="surname"/>
              <Field name="customer.phone" type="text" component={renderField} label="phone Number "/>
              <Field name="customer.contact_way" type="text" component={renderContactWay} label="Best Contact way"/>
              <Field name="customer.time_contact" type="time"  component={renderField} label="Best Time to contact "/>
          
              <h2 style={{margin:"2em"}}>Funeral Section</h2>

              <Field name="burial_type" type="text" component={renderDropDown} label="Type of Funeral"/>
          
              <FormButton href="/" label="Cancel" accent raised    />
              <FormButton type='submit'  label="save" primary raised   />

            

           
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}

// connect redux forms with redux store

export default reduxForm({form: 'deceased', validate })(DeceasedForm);

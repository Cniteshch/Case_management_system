import React from 'react';
import { Form } from 'semantic-ui-react';
import classnames from 'classnames';
import _ from 'lodash';
import Input from 'react-toolbox/lib/input';
import DatePicker from 'react-toolbox/lib/date_picker/DatePicker';
import Dropdown from 'react-toolbox/lib/dropdown';


// default value for funeral type dropdown
const funeral_type = [
  { value: 'Burial', label: 'Burial' },
  { value: 'Cremation', label: 'Cremation'},
  { value: 'Sea', label: 'Sea' },
  { value: 'Tree', label: 'Tree'}
];

// default value for Best Contact Way dropdown
const contact_type = [
  { value: 'Phone', label: 'Phone' }
 
];


// render redux form input field.

export const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <Form.Field className={classnames({error:touched && error})}>
    <label>{label}</label>
     <Input  {...input}  placeholder={label} type={type} />
    
    {touched && error && <span className="error">{error.message}</span>}
  </Form.Field>


)




// Max Death date can be today

const max_datetime = new Date(Date.now());



// render redux form input field for Datepicker.

 export const renderDatePicker = ({ input, label, deceased, type, meta: { touched, error } }) => (

  <Form.Field className={classnames({error:touched && error})}>
    <label>{label}</label>
   
         <DatePicker {...input}   maxDate={max_datetime}  placeholder={label}   
          />
 
      {touched && error && <span className="error">{error.message}</span>}
  </Form.Field>
)

// render redux form input field for Dropdown.

export const renderDropDown = ({ input, label, type, meta: { touched, error } }) => (
  <Form.Field className={classnames({error:touched && error})}>
    <label>{label}</label>

<Dropdown {...input} auto source={funeral_type} />

{touched && error && <span className="error">{error.message}</span>}
  </Form.Field>
)

// render redux form input field for Dropdown.

export const renderContactWay = ({ input, label, type, meta: { touched, error } }) => (
  <Form.Field className={classnames({error:touched && error})}>
    <label>{label}</label>

<Dropdown {...input} auto source={contact_type} />

{touched && error && <span className="error">{error.message}</span>}
  </Form.Field>
)
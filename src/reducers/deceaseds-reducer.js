const defaultDeceased = {
  deceased:{}, customer:{}
}


// setting Initial state for application

const defaultState = {
  deceaseds: [],
  deceased: defaultDeceased,
  fetching: false,
  fetched: false,
  serverError: null,
  errors: {},
  loading:false
}

// error messages for Form submit handler
const normalizeErrors = (data) => {
  const { "deceased.first_name":first, "deceased.last_name":last,  "deceased.address":address, 
   "deceased.date_death":date_death, "customer.first_name":customer_first, "customer.last_name":customer_last, "deceased.phone": customer_phone,
   "customer.contact_way":customer_contact, "customer.time_contact":customer_time, burial_type, email } = data.errors;
  return { deceased: { first,last, address, date_death }, customer: { customer_first,customer_last,customer_phone, customer_contact, customer_time },burial_type,  email }
}


// Fetching all deceaseds details & showing loader till all data fetched. 

export default (state=defaultState, action={}) => {
  switch (action.type) {
    case 'FETCH_DECEASEDS_PENDING': {
      return {
        ...state,
        fetching: true
      }
    }

// success Response for Fetching all deceaseds

    case 'FETCH_DECEASEDS_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        serverError: null,
        deceaseds: action.payload.data.data,
      }
    }

// Rejected response for Fetching all deceaseds Entry Error message server side if any.

    case 'FETCH_DECEASEDS_REJECTED': {
      return {
        ...state,
        fetching: false,
        serverError: action.payload.message
       }
     }

// POST a new Deceased entry start

    case 'NEW_DECEASED': {
      return {
        ...state,
        deceased: defaultDeceased
      }
    }

//Save a new Deceased entry start

    case 'SAVE_DECEASED_PENDING': {
      return {
        ...state,
        loading: true
      }
    }



// Success response for Adding a new Deceased Entry 


    case 'SAVE_DECEASED_FULFILLED': {
      return {
        ...state,
        deceaseds: [...state.deceaseds, action.payload.data],
        serverError: null,
        errors: {},
        loading: false
      }
    }

// Adding a new Deceased Entry Rejected response 

    case 'SAVE_DECEASED_REJECTED': {
      const data = action.payload.response.data;
      const errors = normalizeErrors(data)
      return {
        ...state,
        serverError: data.message,
        errors: errors,
        loading: false
      }
    }


// Initiate Get  Single Deceased Data from API

    case 'FETCH_DECEASED_PENDING': {
      return {
        ...state,
        loading: true,
        deceased: defaultDeceased
      }
    }

// Success response for Get  Single Deceased Data from API

    case 'FETCH_DECEASED_FULFILLED': {
      return {
        ...state,
        deceased: action.payload.data,
        serverError: null,
        errors: {},
        loading: false
      }
    }

// Update Single Deceased Data entry  from API

    case 'UPDATE_DECEASED_PENDING': {
      return {
        ...state,
        loading: true
      }
    }


// success response from API for Update Single Deceased Data entry 

    case 'UPDATE_DECEASED_FULFILLED': {
      const deceased = action.payload.data;
      return {
        ...state,
        deceaseds: state.deceaseds.map(item => item._id === deceased._id ? deceased : item),
        serverError: null,
        errors: {},
        loading: false
      }
    }


// Rejected response from API for Update Single Deceased Data entry 

    case 'UPDATE_DECEASED_REJECTED': {
      const data = action.payload.response.data;
      const errors = normalizeErrors(data)
      return {
        ...state,
        serverError: data.message,
        errors: errors,
        loading: false
      }
    }

// Success response from API for Delete Single Deceased Data entry

    case 'DELETE_DECEASEDFULFILLED': {
      const _id = action.payload.data._id;
      return {
        ...state,
        deceaseds: state.deceaseds.filter(item => item._id !== _id)
        
      }

    }

    default:
      return state;
  }
}

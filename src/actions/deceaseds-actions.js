import { server } from './';


// importing API url from 'actions/index.js' file.


// function for Fetching all Deceased data.

export function fetchDeceaseds() {
  return dispatch => {
    dispatch({
      type: 'FETCH_DECEASEDS',
      payload: server.get("/api/deceaseds")
    })
  }
}

// function for Adding new Deceased data and loading form.

export function newDeceased() {
  return dispatch => {
    dispatch({
      type: 'NEW_DECEASED'
    })
  }
}

// function for Adding new Deceased data success response from api.

export function saveDeceased(deceased) {
  return dispatch => {
    return dispatch({
      type: 'SAVE_DECEASED',
      payload: server.post("/api/deceaseds", deceased)
    })
  }
}

// function for Fetching SIngle Deceased data  from api.

export function fetchDeceased(_id) {
  return dispatch => {
    return dispatch({
      type: 'FETCH_DECEASED',
      payload: server.get(`/api/deceaseds/${_id}`)
    })
  }
}

// function for Editing  SIngle Deceased data  from api.

export function updateDeceased(deceased) {
  return dispatch => {
    return dispatch({
      type: 'UPDATE_DECEASED',
      payload: server.put(`/api/deceaseds/${deceased._id}`, deceased)
    })
  }
}

// function for deleting  Single Deceased data  from api.

export function deleteDeceased(_id) {
  return dispatch => {
    return dispatch({
      type: 'DELETE_DECEASED',
      payload: server.delete(`/api/deceaseds/${_id}`)
    })

      
  }
}



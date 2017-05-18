import React from 'react';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';
import FormButton from '../shared/button.js';  
import { Link } from 'react-router-dom'; 



// Function for every List item of Deceaseds on GET request FetchDeceaseds()

export default function DeceasedCard({deceaseds,deleteDeceased}) {

  return (

<div className="container">  
<div className="col-md-12">  



       <Table  style={{ marginTop: 10 }}>
        <TableHead>
          
          <TableCell >Deceased Name</TableCell>
         
        </TableHead>
        {deceaseds.map((item, _id) => (
          <TableRow key={_id} >
            <TableCell>
              <Link to={`/deceased/edit/${item._id}`} >{item.deceased.first_name} {item.deceased.last_name}</Link>
              <FormButton primary raised label="Delete" onClick={() => deleteDeceased(item._id)} />

            </TableCell>
            
          </TableRow>
        ))}
      </Table> 


</div>
</div>


   
  )
}

//React component regarding type of parameters used 

DeceasedCard.propTypes = {
  deceaseds: React.PropTypes.array.isRequired,
  deleteDeceased: React.PropTypes.func.isRequired
}

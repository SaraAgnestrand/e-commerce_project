import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext'; 
import "./Confirmation.css"


const Confirmation = () => {
    const { user } = useContext(UserContext); 
  
    
    const userName = user ? user.firstName : 'kära kund';
  
    return (
      <div className='confirmation-div'>
       <h2>Tack för ditt köp, {userName}! Välkommen åter!</h2> 
      </div>
    );
  }
  
  export default Confirmation;
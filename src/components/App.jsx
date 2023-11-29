import React, { useState } from 'react';
import MyContacts from './Contacts/MyContacts';

const App = () => {
  
  const [contacts, setContacts] = useState([
    { id: 1, name: 'John Doe', phone: '123-456-7890' },
    { id: 2, name: 'Jane Doe', phone: '987-654-3210' },
    
  ]);

  
  const addContact = (newContact) => {
    setContacts((prevContacts) => [...prevContacts, newContact]);
  };

  return (
    <div>
      
      <MyContacts contacts={contacts} addContact={addContact} />
    </div>
  );
};

export default App;
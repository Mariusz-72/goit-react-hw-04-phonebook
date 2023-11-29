import React, { useState } from 'react';
import MyContacts from './Contacts/MyContacts';

const App = () => {
  // Przykładowy stan, możesz dostosować go do swoich potrzeb
  const [contacts, setContacts] = useState([
    { id: 1, name: 'John Doe', phone: '123-456-7890' },
    { id: 2, name: 'Jane Doe', phone: '987-654-3210' },
    // Dodaj inne kontakty według potrzeb
  ]);

  // Funkcja do dodawania nowego kontaktu
  const addContact = (newContact) => {
    setContacts((prevContacts) => [...prevContacts, newContact]);
  };

  return (
    <div>
      {/* Przekazujemy stan i funkcję do dodawania kontaktów do komponentu MyContacts */}
      <MyContacts contacts={contacts} addContact={addContact} />
    </div>
  );
};

export default App;
import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import MyContactForm from 'components/MyContactForm/MyContactForm';
import MyContactList from 'components/ContactList/ContactList';
import MyContactsFilter from 'components/MyContactsFilter/MyContactsFilter';

import css from './MyContacts.module.css';

const MyContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    if (isDuplicate(name)) {
      return alert(`${name} is already in your contacts`);
    }

    setContacts(prevContacts => [
      { id: nanoid(), name, number },
      ...prevContacts,
    ]);
  };

  const handleFilter = ({ target }) => {
    setFilter(target.value);
  };

  const removeContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const isDuplicate = name => {
    const normalizedName = name.toLowerCase();
    return contacts.some(
      contact => contact.name.toLowerCase() === normalizedName
    );
  };

  const getFilteredContacts = () => {
    const normalizedName = filter.toLowerCase();
    return filter
      ? contacts.filter(contact =>
          contact.name.toLowerCase().includes(normalizedName)
        )
      : contacts;
  };

  const filteredContacts = getFilteredContacts();

  return (
    <div>
      <div className={css.phone_part}>
        <h2 className={css.title}>Phonebook</h2>
        <MyContactForm onSubmit={addContact} />
        <MyContactsFilter handleChange={handleFilter} value={filter} />
      </div>
      <div className={css.contacts_list}>
        <h2 className={css.title}>Contacts</h2>
        <MyContactList
          removeContact={removeContact}
          contacts={filteredContacts}
        />
      </div>
    </div>
  );
};

export default MyContacts;

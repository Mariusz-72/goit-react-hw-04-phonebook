import { nanoid } from 'nanoid';
import { Component } from 'react';

import MyContactForm from 'components/MyContactForm/MyContactForm';
import MyContactList from 'components/ContactList/ContactList';
import MyContactsFilter from 'components/MyContactsFilter/MyContactsFilter';

import css from './MyContacts.module.css';

class MyContacts extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  // Ładowanie kontaktów z localStorage po zamontowaniu komponentu
  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      this.setState({ contacts: JSON.parse(savedContacts) });
    }
  }
  // Zapisywanie kontaktów do localStorage po każdej zmianie w stanie
  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = ({ name, number }) => {
    if (this.isDuplicate(name)) {
      return alert(`${name} is already in your contacts`);
    }

    this.setState(prevState => {
      const { contacts } = prevState;
      const newContact = {
        id: nanoid(),
        name,
        number,
      };

      return { contacts: [newContact, ...contacts], name: '', number: '' };
    });
  };

  handleFilter = ({ target }) => {
    this.setState({ filter: target.value });
  };

  removeContact = id => {
    this.setState(({ contacts }) => {
      const newContact = contacts.filter(contact => contact.id !== id);
      return { contacts: newContact };
    });
  };

  isDuplicate(name) {
    const normalizedName = name.toLowerCase();
    const { contacts } = this.state;
    const result = contacts.find(({ name }) => {
      return name.toLowerCase() === normalizedName;
    });

    return Boolean(result);
  }

  getFilteredContacts() {
    const { filter, contacts } = this.state;

    if (!filter) {
      return contacts;
    }

    const normalizedName = filter.toLowerCase();
    const result = contacts.filter(({ name }) => {
      return name.toLowerCase().includes(normalizedName);
    });
    return result;
  }

  render() {
    const { addContact, removeContact, handleFilter } = this;
    const contacts = this.getFilteredContacts();

    return (
      <div>
        <div className={css.phone_part}>
          <h2 className={css.title}>Phonebook</h2>
          <MyContactForm onSubmit={addContact} />
          <MyContactsFilter
            handleChange={handleFilter}
            value={this.state.filter}
          />
        </div>
        <div className={css.contacts_list}>
          <h2 className={css.title}>Contacts</h2>
          <MyContactList removeContact={removeContact} contacts={contacts} />
        </div>
      </div>
    );
  }
}

export default MyContacts;

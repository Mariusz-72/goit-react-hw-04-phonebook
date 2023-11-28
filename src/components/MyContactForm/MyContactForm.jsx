import { Component } from 'react';
import PropTypes from 'prop-types';

import css from './MyContactForm.module.css';

class MyContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  componentDidMount() {
    // Pobieranie danych z localStorage po zamontowaniu komponentu
    const savedFormData = localStorage.getItem('formData');
    if (savedFormData) {
      this.setState(JSON.parse(savedFormData));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // Zapisywanie danych formularza do localStorage po każdej zmianie w stanie
    if (prevState !== this.state) {
      localStorage.setItem('formData', JSON.stringify(this.state));
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    onSubmit({ ...this.state });
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { handleChange, handleSubmit } = this;
    const { name, number } = this.state;

    return (
      <div className={css.phonebook_wrapper}>
        <form className={css.phonebook_form} onSubmit={handleSubmit}>
          <label className={css.phonebook_name}>Name</label>
          <input
            className={css.input}
            onChange={handleChange}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Pablo, Pablo Esteban, Pablo d'Esteban"
            required
            value={name}
            placeholder="  contact name"
          />

          <label className={css.phonebook_number}>Number</label>
          <input
            className={css.input}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            placeholder="  contact number"
            value={number}
            onChange={handleChange}
          />

          <button className={css.button} type="submit">
            Add contact
          </button>
        </form>
      </div>
    );
  }
}

MyContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default MyContactForm;

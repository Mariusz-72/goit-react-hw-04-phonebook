import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import css from './MyContactForm.module.css';

const MyContactForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
  });

  useEffect(() => {
    const savedFormData = localStorage.getItem('formData');
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []); // Pusta tablica dependency, useEffect wykona się tylko przy montowaniu komponentu

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]); // useEffect wykona się za każdym razem, gdy formData zostanie zaktualizowane

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ ...formData });
    setFormData({
      name: '',
      number: '',
    });
  };

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
          value={formData.name}
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
          value={formData.number}
          onChange={handleChange}
        />

        <button className={css.button} type="submit">
          Add contact
        </button>
      </form>
    </div>
  );
};

MyContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default MyContactForm;

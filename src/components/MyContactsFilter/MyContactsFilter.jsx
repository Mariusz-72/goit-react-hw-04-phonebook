import React from 'react';
import PropTypes from 'prop-types';
import css from './MyContactsFilter.module.css';

const MyContactsFilter = ({ handleChange, value }) => {
  return (
    <div className={css.filter_wrap}>
      <label>Find contact by name :</label>
      <input
        className={css.input}
        onChange={handleChange}
        name="filter"
        type="text"
        value={value}
      />
    </div>
  );
};

MyContactsFilter.propTypes = {
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default MyContactsFilter;

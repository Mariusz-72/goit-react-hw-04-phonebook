import PropTypes from 'prop-types';
import css from './ContactList.module.css';

const MyContactList = ({ contacts, removeContact }) => {

 if (!contacts) {
   return null; // lub inny sposób obsługi braku danych
 }


    const names = contacts.map(({ id, name, number }) => (
      <li className={css.list_item} key={id}>
        <p>{name}</p>
        <p>:</p>
        <p>{number}</p>
        <button
          className={css.button}
          onClick={() => removeContact(id)}
          type="button"
        >
          Delete
        </button>
      </li>
    ));

    return (
        <div className={css.contacts_wraper}>
            <ul className={css.contact_items}>{names}</ul>
        </div>
    );
};

export default MyContactList;

MyContactList.propTypes = {
    removeContact: PropTypes.func.isRequired,
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        })
    ),
};
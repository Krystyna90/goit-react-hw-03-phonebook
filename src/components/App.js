import React, { Component } from "react";
import { nanoid } from "nanoid";
import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";

class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  addContact = (data) => {
    const addingUniqueName = this.state.contacts
      .map((cont) => cont.name.toLowerCase())
      .includes(data.name.toLowerCase());

    if (addingUniqueName) {
      alert(`${data.name} is already in your phone book`);
    } else {
      const contact = {
        id: nanoid(),
        name: data.name,
        number: data.number,
      };

      this.setState(({ contacts }) => ({
        contacts: [contact, ...contacts],
      }));
    }
  };

  changeFilter = (e) => {
    this.setState({
      filter: e.currentTarget.value,
    });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = (contactID) => {
    this.setState((prevState) => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactID),
      };
    });
  };

  render() {
    const { filter } = this.state;

    const filteredContacts = this.getFilteredContacts();
    return (
      <>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact}></ContactForm>
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter}></Filter>
        <ContactList
          contacts={filteredContacts}
          onDeleteBtn={this.deleteContact}
        ></ContactList>
      </>
    );
  }
}

export default App;

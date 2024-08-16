import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import createContactRecords from '@salesforce/apex/AccountContactController.createContactRecords';

export default class ContactComponent extends LightningElement {
    @api accountId;
    @track contacts = [{ index: 0, firstName: '', lastName: '', email: '', phone: '' }];
    @track disableAddContact = false;

    handleFirstNameChange(event) {
        const index = event.target.dataset.index;
        this.contacts[index].firstName = event.target.value;
    }

    handleLastNameChange(event) {
        const index = event.target.dataset.index;
        this.contacts[index].lastName = event.target.value;
    }

    handleEmailChange(event) {
        const index = event.target.dataset.index;
        this.contacts[index].email = event.target.value;
    }

    handlePhoneChange(event) {
        const index = event.target.dataset.index;
        this.contacts[index].phone = event.target.value;
    }

    handleAddContact() {
        if (this.contacts.length < 4) {
            this.contacts.push({ index: this.contacts.length, firstName: '', lastName: '', email: '', phone: '' });
        }
        if (this.contacts.length === 4) {
            this.disableAddContact = true;
        }
    }

    handleSaveContacts() {
        const contactsToSave = this.contacts.map(contact => ({
            FirstName: contact.firstName,
            LastName: contact.lastName,
            Email: contact.email,
            Phone: contact.phone,
            AccountId: this.accountId
        }));

        createContactRecords({ contacts: contactsToSave })
            .then(() => {
                this.showToast('Success', 'Contacts created successfully', 'success');
                this.resetForm();
            })
            .catch(error => {
                this.showToast('Error', 'An error occurred while creating the contacts', 'error');
                console.error(error);
            });
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title,
            message,
            variant,
        });
        this.dispatchEvent(event);
    }

    resetForm() {
        this.contacts = [{ index: 0, firstName: '', lastName: '', email: '', phone: '' }];
        this.disableAddContact = false;
    }
}

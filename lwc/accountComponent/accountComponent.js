import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import createAccountRecord from '@salesforce/apex/AccountContactController.createAccountRecord';

export default class AccountComponent extends LightningElement {
    @track accountName = '';
    @track accountPhone = '';
    @track accountWebsite = '';
    @track accountId;

    handleAccountNameChange(event) {
        this.accountName = event.target.value;
    }

    handleAccountPhoneChange(event) {
        this.accountPhone = event.target.value;
    }

    handleAccountWebsiteChange(event) {
        this.accountWebsite = event.target.value;
    }

    handleSaveAccount() {
        const accountRecord = {
            Name: this.accountName,
            Phone: this.accountPhone,
            Website: this.accountWebsite
        };

        createAccountRecord({ account: accountRecord })
            .then(result => {
                this.accountId = result;
                this.showToast('Success', 'Account created successfully', 'success');
            })
            .catch(error => {
                this.showToast('Error', 'An error occurred while creating the account', 'error');
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
}

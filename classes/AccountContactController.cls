public with sharing class AccountContactController {
    
    @AuraEnabled
    public static Id createAccountRecord(Account account) {
        insert account;
        return account.Id;
    }

    @AuraEnabled
    public static void createContactRecords(List<Contact> contacts) {
        if (contacts.size() > 0) {
            insert contacts;
        }
    }
}

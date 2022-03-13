class UTXO {
    constructor(amount, owner) {
        this.spent = false;
        this.amount = amount;
        this.owner = owner;
    }

    spend() {
        this.spent = true;
    }
}
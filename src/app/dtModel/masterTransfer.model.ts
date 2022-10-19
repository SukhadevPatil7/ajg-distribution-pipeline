export class MasterTransferModel {
    public masterTransferId : number;
    public transferId : number;
    public transferSequence : string;
    public isTransferEnabled : boolean;

    constructor(masterTransferId : number,transferId : number,transferSequence : string, isTransferEnabled: boolean)
    {
        this.masterTransferId = masterTransferId;
        this.transferId = transferId;
        this.transferSequence = transferSequence;
        this.isTransferEnabled = isTransferEnabled;
    }

}

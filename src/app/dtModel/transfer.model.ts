export class Transfer {
    private transferConfigItemId : number;
    private transferId : number;
    private configName : string;
    private configValue : string;

    constructor(transferConfigItemId : number,transferId : number,configName : string, configValue: string)
    {
        this.transferConfigItemId = transferConfigItemId;
        this.transferId = transferId;
        this.configName = configName;
        this.configValue = configName;
    }

}

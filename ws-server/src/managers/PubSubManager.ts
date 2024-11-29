export class PubSubManager{
    private static instance:PubSubManager;
    private PubSubManager(){

    }
    public static getInstance(){
        if(!this.instance)this.instance = new PubSubManager();
        return this.instance;
    }
    public subscribe(stock:string){

    }
    public unSubscibe(stock:string){

    }
}
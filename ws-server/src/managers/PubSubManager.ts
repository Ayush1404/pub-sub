import { createClient, RedisClientType } from "redis";

type UpdateStockFunction = (stock:string,price:string)=>void
export class PubSubManager{
    private static instance:PubSubManager;
    private redisClient=createClient();
    private updateStock:UpdateStockFunction = (stock,price)=>{

    };
    
    private async PubSubManager(){
        await this.redisClient.connect()
        this.redisClient.on('message',(message)=>{
            console.log(message)
        })
    }

    public static getInstance(updateStock:UpdateStockFunction){
        if(!this.instance){
            this.instance = new PubSubManager();
            this.instance.updateStock = updateStock
        }
        return this.instance;
    }

    public subscribe(stock:string){
        this.redisClient.subscribe(stock,(data)=>{
            this.updateStock(stock,data)
        })
    }
    public unSubscribe(stock:string){
        this.redisClient.unsubscribe(stock)
    }
}
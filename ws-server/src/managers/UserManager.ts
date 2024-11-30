import WebSocket from "ws";
import { PubSubManager } from "./PubSubManager";


export class UserManager{
    private users = new Map<string,WebSocket>();
    private stockSubscription = new Map<string,string[]>;
    private pubSubManager = PubSubManager.getInstance((stock,price)=>{
        const subscriptionArray = this.stockSubscription.get(stock)
        if(!subscriptionArray)return;
        else{
            subscriptionArray.forEach(id => {
                const socket = this.users.get(id)
                if(socket){
                    socket.emit('update-stock',{
                        price
                    })
                }
            });
        }
    })
    public onConnect(socket:WebSocket,id:string){
        this.users.set(id,socket);
    }
    public onDisconnect(id:string){
        this.users.delete(id)
    }
    public onSubscribe(id:string,stock:string){
        const subscriptionArray = this.stockSubscription.get(stock)
        if(!subscriptionArray){
            this.stockSubscription.set(stock,[id]);
            this.pubSubManager.subscribe(stock)
        }
        else if(id in subscriptionArray)return;
        else subscriptionArray.push(id)

    }
    public onUnSubscribe(id:string,stock:string){
        const subscriptionArray = this.stockSubscription.get(stock)
        if(!subscriptionArray || !(id in subscriptionArray))return;
        else{
            if(subscriptionArray.length === 1){
                this.stockSubscription.delete(stock)
                this.pubSubManager.unSubscribe(stock)
            }
            else{
                const newSubscriptionArray = subscriptionArray.filter(ele=>id!==ele)
                this.stockSubscription.set(stock,newSubscriptionArray)
            }
        }
    }
}
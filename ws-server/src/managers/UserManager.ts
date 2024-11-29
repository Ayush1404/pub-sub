import WebSocket from "ws";
import { PubSubManager } from "./PubSubManager";
type Socket = {
    id:string,
    socket:WebSocket
}
class UserManager{
    private users = new Map<string,Socket>();
    private pubSubManager = PubSubManager.getInstance();
    public onConnect(socket:WebSocket){
        
    }
}
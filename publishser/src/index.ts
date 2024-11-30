import { createClient } from "redis";


async function main(){
    const redisClient  = createClient();
    await redisClient.connect()

    const stocks:string[] = ["apple","google","microsoft"]

    setInterval(()=>{
        let stockChoice = (Math.random() * 100) % 3;
        let price = (Math.random() * 100)
        redisClient.publish(stocks[stockChoice],price)
    },1000)
}

main();
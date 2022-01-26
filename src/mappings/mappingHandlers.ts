import { TerraEvent } from "@subql/types";
import { Event } from "../types";
import * as crypto from "crypto";


export async function handleEvent(event: TerraEvent) {
    
    const blockHeight = event.block.block.header.height;
    for (let type in event.event){
        const idx = crypto.randomBytes(32).toString("hex");
        console.log(idx);
        const newEvent = new Event(`${blockHeight}-${idx}`);
        newEvent.blockHeight = Number.parseInt(blockHeight);
        newEvent.type = type;
        newEvent.event = JSON.stringify(event.event[type]);
        newEvent.save();
    }    
   
}


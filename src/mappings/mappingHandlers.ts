import { TerraEvent, TerraMessage } from "@subql/types-terra";
import { Event, Message } from "../types";


export async function handleEvent(event: TerraEvent) {

    const blockHeight = BigInt(event.block.block.block.header.height);
    const eventStore = new Event(`${event.block.block.block_id.hash}-${event.tx.tx.txhash}-${event.idx}`);
    eventStore.blockHeight = blockHeight;
    eventStore.txHash = event.tx.tx.txhash;
    eventStore.type = event.event.type;
    eventStore.msgType = event.msg.msg.toData()["@type"];
    const msgData = event.msg.msg.toData();
    eventStore.data = Object.keys(msgData).map(key => ({ key: key, value: msgData[key] }));
    await eventStore.save();
}

export async function handleMessage(message: TerraMessage) {
    const blockHeight = BigInt(message.block.block.block.header.height);
    const messageStore = new Message(`${message.block.block.block_id.hash}-${message.tx.tx.txhash}-${message.idx}`);
    messageStore.blockHeight = blockHeight;
    messageStore.txHash = message.tx.tx.txhash;
    messageStore.type = message.msg.toData()["@type"];
    const msgData = message.msg.toData();
    messageStore.data = Object.keys(msgData).map(key => ({ key: key, value: msgData[key] }));
    await messageStore.save();
}


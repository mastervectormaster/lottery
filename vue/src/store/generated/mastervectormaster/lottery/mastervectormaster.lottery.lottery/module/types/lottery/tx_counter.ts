/* eslint-disable */
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "mastervectormaster.lottery.lottery";

export interface TxCounter {
  counter: string;
}

const baseTxCounter: object = { counter: "" };

export const TxCounter = {
  encode(message: TxCounter, writer: Writer = Writer.create()): Writer {
    if (message.counter !== "") {
      writer.uint32(10).string(message.counter);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): TxCounter {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseTxCounter } as TxCounter;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.counter = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TxCounter {
    const message = { ...baseTxCounter } as TxCounter;
    if (object.counter !== undefined && object.counter !== null) {
      message.counter = String(object.counter);
    } else {
      message.counter = "";
    }
    return message;
  },

  toJSON(message: TxCounter): unknown {
    const obj: any = {};
    message.counter !== undefined && (obj.counter = message.counter);
    return obj;
  },

  fromPartial(object: DeepPartial<TxCounter>): TxCounter {
    const message = { ...baseTxCounter } as TxCounter;
    if (object.counter !== undefined && object.counter !== null) {
      message.counter = object.counter;
    } else {
      message.counter = "";
    }
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

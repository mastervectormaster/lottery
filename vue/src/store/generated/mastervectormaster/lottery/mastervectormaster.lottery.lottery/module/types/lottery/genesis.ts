/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import { Params } from "../lottery/params";
import { TxCounter } from "../lottery/tx_counter";
import { User } from "../lottery/user";

export const protobufPackage = "mastervectormaster.lottery.lottery";

/** GenesisState defines the lottery module's genesis state. */
export interface GenesisState {
  params: Params | undefined;
  txCounter: TxCounter | undefined;
  userList: User[];
  /** this line is used by starport scaffolding # genesis/proto/state */
  userCount: number;
}

const baseGenesisState: object = { userCount: 0 };

export const GenesisState = {
  encode(message: GenesisState, writer: Writer = Writer.create()): Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    if (message.txCounter !== undefined) {
      TxCounter.encode(message.txCounter, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.userList) {
      User.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.userCount !== 0) {
      writer.uint32(32).uint64(message.userCount);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGenesisState } as GenesisState;
    message.userList = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 2:
          message.txCounter = TxCounter.decode(reader, reader.uint32());
          break;
        case 3:
          message.userList.push(User.decode(reader, reader.uint32()));
          break;
        case 4:
          message.userCount = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
    message.userList = [];
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromJSON(object.params);
    } else {
      message.params = undefined;
    }
    if (object.txCounter !== undefined && object.txCounter !== null) {
      message.txCounter = TxCounter.fromJSON(object.txCounter);
    } else {
      message.txCounter = undefined;
    }
    if (object.userList !== undefined && object.userList !== null) {
      for (const e of object.userList) {
        message.userList.push(User.fromJSON(e));
      }
    }
    if (object.userCount !== undefined && object.userCount !== null) {
      message.userCount = Number(object.userCount);
    } else {
      message.userCount = 0;
    }
    return message;
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    message.txCounter !== undefined &&
      (obj.txCounter = message.txCounter
        ? TxCounter.toJSON(message.txCounter)
        : undefined);
    if (message.userList) {
      obj.userList = message.userList.map((e) =>
        e ? User.toJSON(e) : undefined
      );
    } else {
      obj.userList = [];
    }
    message.userCount !== undefined && (obj.userCount = message.userCount);
    return obj;
  },

  fromPartial(object: DeepPartial<GenesisState>): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
    message.userList = [];
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params);
    } else {
      message.params = undefined;
    }
    if (object.txCounter !== undefined && object.txCounter !== null) {
      message.txCounter = TxCounter.fromPartial(object.txCounter);
    } else {
      message.txCounter = undefined;
    }
    if (object.userList !== undefined && object.userList !== null) {
      for (const e of object.userList) {
        message.userList.push(User.fromPartial(e));
      }
    }
    if (object.userCount !== undefined && object.userCount !== null) {
      message.userCount = object.userCount;
    } else {
      message.userCount = 0;
    }
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

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

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}

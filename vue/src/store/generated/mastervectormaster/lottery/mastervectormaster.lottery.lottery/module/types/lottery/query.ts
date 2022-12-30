/* eslint-disable */
import { Reader, util, configure, Writer } from "protobufjs/minimal";
import * as Long from "long";
import { Params } from "../lottery/params";
import { TxCounter } from "../lottery/tx_counter";
import { User } from "../lottery/user";
import {
  PageRequest,
  PageResponse,
} from "../cosmos/base/query/v1beta1/pagination";
import { Bet } from "../lottery/bet";

export const protobufPackage = "mastervectormaster.lottery.lottery";

/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}

/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params: Params | undefined;
}

export interface QueryGetTxCounterRequest {}

export interface QueryGetTxCounterResponse {
  TxCounter: TxCounter | undefined;
}

export interface QueryGetUserRequest {
  id: number;
}

export interface QueryGetUserResponse {
  User: User | undefined;
}

export interface QueryAllUserRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllUserResponse {
  User: User[];
  pagination: PageResponse | undefined;
}

export interface QueryGetBetRequest {
  index: string;
}

export interface QueryGetBetResponse {
  bet: Bet | undefined;
}

export interface QueryAllBetRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllBetResponse {
  bet: Bet[];
  pagination: PageResponse | undefined;
}

const baseQueryParamsRequest: object = {};

export const QueryParamsRequest = {
  encode(_: QueryParamsRequest, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): QueryParamsRequest {
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
    return message;
  },

  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<QueryParamsRequest>): QueryParamsRequest {
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
    return message;
  },
};

const baseQueryParamsResponse: object = {};

export const QueryParamsResponse = {
  encode(
    message: QueryParamsResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryParamsResponse {
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromJSON(object.params);
    } else {
      message.params = undefined;
    }
    return message;
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryParamsResponse>): QueryParamsResponse {
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params);
    } else {
      message.params = undefined;
    }
    return message;
  },
};

const baseQueryGetTxCounterRequest: object = {};

export const QueryGetTxCounterRequest = {
  encode(
    _: QueryGetTxCounterRequest,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetTxCounterRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetTxCounterRequest,
    } as QueryGetTxCounterRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): QueryGetTxCounterRequest {
    const message = {
      ...baseQueryGetTxCounterRequest,
    } as QueryGetTxCounterRequest;
    return message;
  },

  toJSON(_: QueryGetTxCounterRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<QueryGetTxCounterRequest>
  ): QueryGetTxCounterRequest {
    const message = {
      ...baseQueryGetTxCounterRequest,
    } as QueryGetTxCounterRequest;
    return message;
  },
};

const baseQueryGetTxCounterResponse: object = {};

export const QueryGetTxCounterResponse = {
  encode(
    message: QueryGetTxCounterResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.TxCounter !== undefined) {
      TxCounter.encode(message.TxCounter, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetTxCounterResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetTxCounterResponse,
    } as QueryGetTxCounterResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.TxCounter = TxCounter.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetTxCounterResponse {
    const message = {
      ...baseQueryGetTxCounterResponse,
    } as QueryGetTxCounterResponse;
    if (object.TxCounter !== undefined && object.TxCounter !== null) {
      message.TxCounter = TxCounter.fromJSON(object.TxCounter);
    } else {
      message.TxCounter = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetTxCounterResponse): unknown {
    const obj: any = {};
    message.TxCounter !== undefined &&
      (obj.TxCounter = message.TxCounter
        ? TxCounter.toJSON(message.TxCounter)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetTxCounterResponse>
  ): QueryGetTxCounterResponse {
    const message = {
      ...baseQueryGetTxCounterResponse,
    } as QueryGetTxCounterResponse;
    if (object.TxCounter !== undefined && object.TxCounter !== null) {
      message.TxCounter = TxCounter.fromPartial(object.TxCounter);
    } else {
      message.TxCounter = undefined;
    }
    return message;
  },
};

const baseQueryGetUserRequest: object = { id: 0 };

export const QueryGetUserRequest = {
  encode(
    message: QueryGetUserRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetUserRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryGetUserRequest } as QueryGetUserRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetUserRequest {
    const message = { ...baseQueryGetUserRequest } as QueryGetUserRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    return message;
  },

  toJSON(message: QueryGetUserRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryGetUserRequest>): QueryGetUserRequest {
    const message = { ...baseQueryGetUserRequest } as QueryGetUserRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    return message;
  },
};

const baseQueryGetUserResponse: object = {};

export const QueryGetUserResponse = {
  encode(
    message: QueryGetUserResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.User !== undefined) {
      User.encode(message.User, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetUserResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryGetUserResponse } as QueryGetUserResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.User = User.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetUserResponse {
    const message = { ...baseQueryGetUserResponse } as QueryGetUserResponse;
    if (object.User !== undefined && object.User !== null) {
      message.User = User.fromJSON(object.User);
    } else {
      message.User = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetUserResponse): unknown {
    const obj: any = {};
    message.User !== undefined &&
      (obj.User = message.User ? User.toJSON(message.User) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryGetUserResponse>): QueryGetUserResponse {
    const message = { ...baseQueryGetUserResponse } as QueryGetUserResponse;
    if (object.User !== undefined && object.User !== null) {
      message.User = User.fromPartial(object.User);
    } else {
      message.User = undefined;
    }
    return message;
  },
};

const baseQueryAllUserRequest: object = {};

export const QueryAllUserRequest = {
  encode(
    message: QueryAllUserRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllUserRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAllUserRequest } as QueryAllUserRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllUserRequest {
    const message = { ...baseQueryAllUserRequest } as QueryAllUserRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllUserRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryAllUserRequest>): QueryAllUserRequest {
    const message = { ...baseQueryAllUserRequest } as QueryAllUserRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryAllUserResponse: object = {};

export const QueryAllUserResponse = {
  encode(
    message: QueryAllUserResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.User) {
      User.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllUserResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAllUserResponse } as QueryAllUserResponse;
    message.User = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.User.push(User.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllUserResponse {
    const message = { ...baseQueryAllUserResponse } as QueryAllUserResponse;
    message.User = [];
    if (object.User !== undefined && object.User !== null) {
      for (const e of object.User) {
        message.User.push(User.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllUserResponse): unknown {
    const obj: any = {};
    if (message.User) {
      obj.User = message.User.map((e) => (e ? User.toJSON(e) : undefined));
    } else {
      obj.User = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryAllUserResponse>): QueryAllUserResponse {
    const message = { ...baseQueryAllUserResponse } as QueryAllUserResponse;
    message.User = [];
    if (object.User !== undefined && object.User !== null) {
      for (const e of object.User) {
        message.User.push(User.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryGetBetRequest: object = { index: "" };

export const QueryGetBetRequest = {
  encode(
    message: QueryGetBetRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.index !== "") {
      writer.uint32(10).string(message.index);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetBetRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryGetBetRequest } as QueryGetBetRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.index = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetBetRequest {
    const message = { ...baseQueryGetBetRequest } as QueryGetBetRequest;
    if (object.index !== undefined && object.index !== null) {
      message.index = String(object.index);
    } else {
      message.index = "";
    }
    return message;
  },

  toJSON(message: QueryGetBetRequest): unknown {
    const obj: any = {};
    message.index !== undefined && (obj.index = message.index);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryGetBetRequest>): QueryGetBetRequest {
    const message = { ...baseQueryGetBetRequest } as QueryGetBetRequest;
    if (object.index !== undefined && object.index !== null) {
      message.index = object.index;
    } else {
      message.index = "";
    }
    return message;
  },
};

const baseQueryGetBetResponse: object = {};

export const QueryGetBetResponse = {
  encode(
    message: QueryGetBetResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.bet !== undefined) {
      Bet.encode(message.bet, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetBetResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryGetBetResponse } as QueryGetBetResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.bet = Bet.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetBetResponse {
    const message = { ...baseQueryGetBetResponse } as QueryGetBetResponse;
    if (object.bet !== undefined && object.bet !== null) {
      message.bet = Bet.fromJSON(object.bet);
    } else {
      message.bet = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetBetResponse): unknown {
    const obj: any = {};
    message.bet !== undefined &&
      (obj.bet = message.bet ? Bet.toJSON(message.bet) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryGetBetResponse>): QueryGetBetResponse {
    const message = { ...baseQueryGetBetResponse } as QueryGetBetResponse;
    if (object.bet !== undefined && object.bet !== null) {
      message.bet = Bet.fromPartial(object.bet);
    } else {
      message.bet = undefined;
    }
    return message;
  },
};

const baseQueryAllBetRequest: object = {};

export const QueryAllBetRequest = {
  encode(
    message: QueryAllBetRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllBetRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAllBetRequest } as QueryAllBetRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllBetRequest {
    const message = { ...baseQueryAllBetRequest } as QueryAllBetRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllBetRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryAllBetRequest>): QueryAllBetRequest {
    const message = { ...baseQueryAllBetRequest } as QueryAllBetRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryAllBetResponse: object = {};

export const QueryAllBetResponse = {
  encode(
    message: QueryAllBetResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.bet) {
      Bet.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllBetResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAllBetResponse } as QueryAllBetResponse;
    message.bet = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.bet.push(Bet.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllBetResponse {
    const message = { ...baseQueryAllBetResponse } as QueryAllBetResponse;
    message.bet = [];
    if (object.bet !== undefined && object.bet !== null) {
      for (const e of object.bet) {
        message.bet.push(Bet.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllBetResponse): unknown {
    const obj: any = {};
    if (message.bet) {
      obj.bet = message.bet.map((e) => (e ? Bet.toJSON(e) : undefined));
    } else {
      obj.bet = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryAllBetResponse>): QueryAllBetResponse {
    const message = { ...baseQueryAllBetResponse } as QueryAllBetResponse;
    message.bet = [];
    if (object.bet !== undefined && object.bet !== null) {
      for (const e of object.bet) {
        message.bet.push(Bet.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a TxCounter by index. */
  TxCounter(
    request: QueryGetTxCounterRequest
  ): Promise<QueryGetTxCounterResponse>;
  /** Queries a User by id. */
  User(request: QueryGetUserRequest): Promise<QueryGetUserResponse>;
  /** Queries a list of User items. */
  UserAll(request: QueryAllUserRequest): Promise<QueryAllUserResponse>;
  /** Queries a Bet by index. */
  Bet(request: QueryGetBetRequest): Promise<QueryGetBetResponse>;
  /** Queries a list of Bet items. */
  BetAll(request: QueryAllBetRequest): Promise<QueryAllBetResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "mastervectormaster.lottery.lottery.Query",
      "Params",
      data
    );
    return promise.then((data) => QueryParamsResponse.decode(new Reader(data)));
  }

  TxCounter(
    request: QueryGetTxCounterRequest
  ): Promise<QueryGetTxCounterResponse> {
    const data = QueryGetTxCounterRequest.encode(request).finish();
    const promise = this.rpc.request(
      "mastervectormaster.lottery.lottery.Query",
      "TxCounter",
      data
    );
    return promise.then((data) =>
      QueryGetTxCounterResponse.decode(new Reader(data))
    );
  }

  User(request: QueryGetUserRequest): Promise<QueryGetUserResponse> {
    const data = QueryGetUserRequest.encode(request).finish();
    const promise = this.rpc.request(
      "mastervectormaster.lottery.lottery.Query",
      "User",
      data
    );
    return promise.then((data) =>
      QueryGetUserResponse.decode(new Reader(data))
    );
  }

  UserAll(request: QueryAllUserRequest): Promise<QueryAllUserResponse> {
    const data = QueryAllUserRequest.encode(request).finish();
    const promise = this.rpc.request(
      "mastervectormaster.lottery.lottery.Query",
      "UserAll",
      data
    );
    return promise.then((data) =>
      QueryAllUserResponse.decode(new Reader(data))
    );
  }

  Bet(request: QueryGetBetRequest): Promise<QueryGetBetResponse> {
    const data = QueryGetBetRequest.encode(request).finish();
    const promise = this.rpc.request(
      "mastervectormaster.lottery.lottery.Query",
      "Bet",
      data
    );
    return promise.then((data) => QueryGetBetResponse.decode(new Reader(data)));
  }

  BetAll(request: QueryAllBetRequest): Promise<QueryAllBetResponse> {
    const data = QueryAllBetRequest.encode(request).finish();
    const promise = this.rpc.request(
      "mastervectormaster.lottery.lottery.Query",
      "BetAll",
      data
    );
    return promise.then((data) => QueryAllBetResponse.decode(new Reader(data)));
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

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

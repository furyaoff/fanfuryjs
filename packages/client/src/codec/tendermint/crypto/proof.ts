/* eslint-disable */
import { messageTypeRegistry } from '../../typeRegistry';
import Long from 'long';
import _m0 from 'protobufjs/minimal';

export const protobufPackage = 'tendermint.crypto';

export interface Proof {
  $type: 'tendermint.crypto.Proof';
  total: Long;
  index: Long;
  leafHash: Uint8Array;
  aunts: Uint8Array[];
}

export interface ValueOp {
  $type: 'tendermint.crypto.ValueOp';
  /** Encoded in ProofOp.Key. */
  key: Uint8Array;
  /** To encode in ProofOp.Data */
  proof?: Proof;
}

export interface DominoOp {
  $type: 'tendermint.crypto.DominoOp';
  key: string;
  input: string;
  output: string;
}

/**
 * ProofOp defines an operation used for calculating Merkle root
 * The data could be arbitrary format, providing nessecary data
 * for example neighbouring node hash
 */
export interface ProofOp {
  $type: 'tendermint.crypto.ProofOp';
  type: string;
  key: Uint8Array;
  data: Uint8Array;
}

/** ProofOps is Merkle proof defined by the list of ProofOps */
export interface ProofOps {
  $type: 'tendermint.crypto.ProofOps';
  ops: ProofOp[];
}

function createBaseProof(): Proof {
  return {
    $type: 'tendermint.crypto.Proof',
    total: Long.ZERO,
    index: Long.ZERO,
    leafHash: new Uint8Array(),
    aunts: [],
  };
}

export const Proof = {
  $type: 'tendermint.crypto.Proof' as const,

  encode(message: Proof, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.total.isZero()) {
      writer.uint32(8).int64(message.total);
    }
    if (!message.index.isZero()) {
      writer.uint32(16).int64(message.index);
    }
    if (message.leafHash.length !== 0) {
      writer.uint32(26).bytes(message.leafHash);
    }
    for (const v of message.aunts) {
      writer.uint32(34).bytes(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Proof {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProof();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.total = reader.int64() as Long;
          break;
        case 2:
          message.index = reader.int64() as Long;
          break;
        case 3:
          message.leafHash = reader.bytes();
          break;
        case 4:
          message.aunts.push(reader.bytes());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Proof {
    return {
      $type: Proof.$type,
      total: isSet(object.total) ? Long.fromValue(object.total) : Long.ZERO,
      index: isSet(object.index) ? Long.fromValue(object.index) : Long.ZERO,
      leafHash: isSet(object.leafHash)
        ? bytesFromBase64(object.leafHash)
        : new Uint8Array(),
      aunts: Array.isArray(object?.aunts)
        ? object.aunts.map((e: any) => bytesFromBase64(e))
        : [],
    };
  },

  toJSON(message: Proof): unknown {
    const obj: any = {};
    message.total !== undefined &&
      (obj.total = (message.total || Long.ZERO).toString());
    message.index !== undefined &&
      (obj.index = (message.index || Long.ZERO).toString());
    message.leafHash !== undefined &&
      (obj.leafHash = base64FromBytes(
        message.leafHash !== undefined ? message.leafHash : new Uint8Array(),
      ));
    if (message.aunts) {
      obj.aunts = message.aunts.map(e =>
        base64FromBytes(e !== undefined ? e : new Uint8Array()),
      );
    } else {
      obj.aunts = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Proof>, I>>(object: I): Proof {
    const message = createBaseProof();
    message.total =
      object.total !== undefined && object.total !== null
        ? Long.fromValue(object.total)
        : Long.ZERO;
    message.index =
      object.index !== undefined && object.index !== null
        ? Long.fromValue(object.index)
        : Long.ZERO;
    message.leafHash = object.leafHash ?? new Uint8Array();
    message.aunts = object.aunts?.map(e => e) || [];
    return message;
  },
};

messageTypeRegistry.set(Proof.$type, Proof);

function createBaseValueOp(): ValueOp {
  return {
    $type: 'tendermint.crypto.ValueOp',
    key: new Uint8Array(),
    proof: undefined,
  };
}

export const ValueOp = {
  $type: 'tendermint.crypto.ValueOp' as const,

  encode(
    message: ValueOp,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.key.length !== 0) {
      writer.uint32(10).bytes(message.key);
    }
    if (message.proof !== undefined) {
      Proof.encode(message.proof, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValueOp {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValueOp();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.bytes();
          break;
        case 2:
          message.proof = Proof.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ValueOp {
    return {
      $type: ValueOp.$type,
      key: isSet(object.key) ? bytesFromBase64(object.key) : new Uint8Array(),
      proof: isSet(object.proof) ? Proof.fromJSON(object.proof) : undefined,
    };
  },

  toJSON(message: ValueOp): unknown {
    const obj: any = {};
    message.key !== undefined &&
      (obj.key = base64FromBytes(
        message.key !== undefined ? message.key : new Uint8Array(),
      ));
    message.proof !== undefined &&
      (obj.proof = message.proof ? Proof.toJSON(message.proof) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ValueOp>, I>>(object: I): ValueOp {
    const message = createBaseValueOp();
    message.key = object.key ?? new Uint8Array();
    message.proof =
      object.proof !== undefined && object.proof !== null
        ? Proof.fromPartial(object.proof)
        : undefined;
    return message;
  },
};

messageTypeRegistry.set(ValueOp.$type, ValueOp);

function createBaseDominoOp(): DominoOp {
  return {
    $type: 'tendermint.crypto.DominoOp',
    key: '',
    input: '',
    output: '',
  };
}

export const DominoOp = {
  $type: 'tendermint.crypto.DominoOp' as const,

  encode(
    message: DominoOp,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.key !== '') {
      writer.uint32(10).string(message.key);
    }
    if (message.input !== '') {
      writer.uint32(18).string(message.input);
    }
    if (message.output !== '') {
      writer.uint32(26).string(message.output);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DominoOp {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDominoOp();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.input = reader.string();
          break;
        case 3:
          message.output = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DominoOp {
    return {
      $type: DominoOp.$type,
      key: isSet(object.key) ? String(object.key) : '',
      input: isSet(object.input) ? String(object.input) : '',
      output: isSet(object.output) ? String(object.output) : '',
    };
  },

  toJSON(message: DominoOp): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.input !== undefined && (obj.input = message.input);
    message.output !== undefined && (obj.output = message.output);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DominoOp>, I>>(object: I): DominoOp {
    const message = createBaseDominoOp();
    message.key = object.key ?? '';
    message.input = object.input ?? '';
    message.output = object.output ?? '';
    return message;
  },
};

messageTypeRegistry.set(DominoOp.$type, DominoOp);

function createBaseProofOp(): ProofOp {
  return {
    $type: 'tendermint.crypto.ProofOp',
    type: '',
    key: new Uint8Array(),
    data: new Uint8Array(),
  };
}

export const ProofOp = {
  $type: 'tendermint.crypto.ProofOp' as const,

  encode(
    message: ProofOp,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.type !== '') {
      writer.uint32(10).string(message.type);
    }
    if (message.key.length !== 0) {
      writer.uint32(18).bytes(message.key);
    }
    if (message.data.length !== 0) {
      writer.uint32(26).bytes(message.data);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProofOp {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProofOp();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.string();
          break;
        case 2:
          message.key = reader.bytes();
          break;
        case 3:
          message.data = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ProofOp {
    return {
      $type: ProofOp.$type,
      type: isSet(object.type) ? String(object.type) : '',
      key: isSet(object.key) ? bytesFromBase64(object.key) : new Uint8Array(),
      data: isSet(object.data)
        ? bytesFromBase64(object.data)
        : new Uint8Array(),
    };
  },

  toJSON(message: ProofOp): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = message.type);
    message.key !== undefined &&
      (obj.key = base64FromBytes(
        message.key !== undefined ? message.key : new Uint8Array(),
      ));
    message.data !== undefined &&
      (obj.data = base64FromBytes(
        message.data !== undefined ? message.data : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ProofOp>, I>>(object: I): ProofOp {
    const message = createBaseProofOp();
    message.type = object.type ?? '';
    message.key = object.key ?? new Uint8Array();
    message.data = object.data ?? new Uint8Array();
    return message;
  },
};

messageTypeRegistry.set(ProofOp.$type, ProofOp);

function createBaseProofOps(): ProofOps {
  return { $type: 'tendermint.crypto.ProofOps', ops: [] };
}

export const ProofOps = {
  $type: 'tendermint.crypto.ProofOps' as const,

  encode(
    message: ProofOps,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.ops) {
      ProofOp.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProofOps {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProofOps();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ops.push(ProofOp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ProofOps {
    return {
      $type: ProofOps.$type,
      ops: Array.isArray(object?.ops)
        ? object.ops.map((e: any) => ProofOp.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ProofOps): unknown {
    const obj: any = {};
    if (message.ops) {
      obj.ops = message.ops.map(e => (e ? ProofOp.toJSON(e) : undefined));
    } else {
      obj.ops = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ProofOps>, I>>(object: I): ProofOps {
    const message = createBaseProofOps();
    message.ops = object.ops?.map(e => ProofOp.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(ProofOps.$type, ProofOps);

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== 'undefined') return globalThis;
  if (typeof self !== 'undefined') return self;
  if (typeof window !== 'undefined') return window;
  if (typeof global !== 'undefined') return global;
  throw 'Unable to locate global object';
})();

function bytesFromBase64(b64: string): Uint8Array {
  if (globalThis.Buffer) {
    return Uint8Array.from(globalThis.Buffer.from(b64, 'base64'));
  } else {
    const bin = globalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (globalThis.Buffer) {
    return globalThis.Buffer.from(arr).toString('base64');
  } else {
    const bin: string[] = [];
    arr.forEach(byte => {
      bin.push(String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(''));
  }
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Long
  ? string | number | Long
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in Exclude<keyof T, '$type'>]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & {
      [K in Exclude<keyof I, KeysOfUnion<P> | '$type'>]: never;
    };

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

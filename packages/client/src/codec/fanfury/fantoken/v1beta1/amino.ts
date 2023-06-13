import { MicroDenom } from '../../../../constants';
import { AminoMsg } from '@cosmjs/amino';
import { AminoConverter } from '@cosmjs/stargate';
import {
  MsgIssue,
  MsgMint,
  MsgBurn,
  MsgDisableMint,
  MsgSetMinter,
  MsgSetAuthority,
  MsgSetUri,
} from './tx';
import Long from 'long';

export interface AminoMsgIssue extends AminoMsg {
  type: '/fanfury.fantoken.MsgIssue';
  value: {
    symbol: string;
    name: string;
    max_supply: string;
    authority: string;
    minter: string;
    uri: string;
  };
}
export interface AminoMsgMint extends AminoMsg {
  type: '/fanfury.fantoken.MsgMint';
  value: {
    recipient: string;
    coin: {
      denom: string;
      amount: string;
    };
    minter: string;
  };
}
export interface AminoMsgBurn extends AminoMsg {
  type: '/fanfury.fantoken.MsgBurn';
  value: {
    coin: {
      denom: string;
      amount: string;
    };
    sender: string;
  };
}
export interface AminoMsgDisableMint extends AminoMsg {
  type: '/fanfury.fantoken.MsgDisableMint';
  value: {
    denom: string;
    minter: string;
  };
}
export interface AminoMsgSetMinter extends AminoMsg {
  type: '/fanfury.fantoken.MsgSetMinter';
  value: {
    denom: string;
    old_minter: string;
    new_minter: string;
  };
}
export interface AminoMsgSetAuthority extends AminoMsg {
  type: '/fanfury.fantoken.MsgSetAuthority';
  value: {
    denom: string;
    old_authority: string;
    new_authority: string;
  };
}
export interface AminoMsgSetUri extends AminoMsg {
  type: '/fanfury.fantoken.MsgSetUri';
  value: {
    authority: string;
    denom: string;
    uri: string;
  };
}
export const aminoConverter: { [key: string]: AminoConverter } = {
  '/fanfury.fantoken.MsgIssue': {
    aminoType: 'go-fanfury/fantoken/MsgIssue',
    toAmino: ({
      symbol,
      name,
      maxSupply,
      authority,
      minter,
      uri,
    }: MsgIssue): AminoMsgIssue['value'] => {
      return {
        symbol,
        name,
        max_supply: maxSupply,
        authority,
        minter,
        uri,
      };
    },
    fromAmino: ({
      symbol,
      name,
      max_supply,
      authority,
      minter,
      uri,
    }: AminoMsgIssue['value']): MsgIssue => {
      return {
        $type: 'fanfury.fantoken.MsgIssue',
        symbol,
        name,
        maxSupply: max_supply,
        authority,
        minter,
        uri,
      };
    },
  },
  '/fanfury.fantoken.MsgMint': {
    aminoType: 'go-fanfury/fantoken/MsgMint',
    toAmino: ({ recipient, coin, minter }: MsgMint): AminoMsgMint['value'] => {
      return {
        recipient,
        coin: {
          denom: coin ? coin.denom : MicroDenom,
          amount: Long.fromString(coin ? coin.amount : '0').toString(),
        },
        minter,
      };
    },
    fromAmino: ({
      recipient,
      coin,
      minter,
    }: AminoMsgMint['value']): MsgMint => {
      return {
        $type: 'fanfury.fantoken.MsgMint',
        recipient,
        coin: {
          $type: 'cosmos.base.v1beta1.Coin',
          denom: coin.denom,
          amount: coin.amount,
        },
        minter,
      };
    },
  },
  '/fanfury.fantoken.MsgBurn': {
    aminoType: 'go-fanfury/fantoken/MsgBurn',
    toAmino: ({ coin, sender }: MsgBurn): AminoMsgBurn['value'] => {
      return {
        coin: {
          denom: coin ? coin.denom : MicroDenom,
          amount: Long.fromString(coin ? coin.amount : '0').toString(),
        },
        sender,
      };
    },
    fromAmino: ({ coin, sender }: AminoMsgBurn['value']): MsgBurn => {
      return {
        $type: 'fanfury.fantoken.MsgBurn',
        coin: {
          $type: 'cosmos.base.v1beta1.Coin',
          denom: coin.denom,
          amount: coin.amount,
        },
        sender,
      };
    },
  },
  '/fanfury.fantoken.MsgDisableMint': {
    aminoType: 'go-fanfury/fantoken/MsgDisableMint',
    toAmino: ({
      denom,
      minter,
    }: MsgDisableMint): AminoMsgDisableMint['value'] => {
      return {
        denom,
        minter,
      };
    },
    fromAmino: ({
      denom,
      minter,
    }: AminoMsgDisableMint['value']): MsgDisableMint => {
      return {
        $type: 'fanfury.fantoken.MsgDisableMint',
        denom,
        minter,
      };
    },
  },
  '/fanfury.fantoken.MsgSetMinter': {
    aminoType: 'go-fanfury/fantoken/MsgSetMinter',
    toAmino: ({
      denom,
      oldMinter,
      newMinter,
    }: MsgSetMinter): AminoMsgSetMinter['value'] => {
      return {
        denom,
        old_minter: oldMinter,
        new_minter: newMinter,
      };
    },
    fromAmino: ({
      denom,
      old_minter,
      new_minter,
    }: AminoMsgSetMinter['value']): MsgSetMinter => {
      return {
        $type: 'fanfury.fantoken.MsgSetMinter',
        denom,
        oldMinter: old_minter,
        newMinter: new_minter,
      };
    },
  },
  '/fanfury.fantoken.MsgSetAuthority': {
    aminoType: 'go-fanfury/fantoken/MsgSetAuthority',
    toAmino: ({
      denom,
      oldAuthority,
      newAuthority,
    }: MsgSetAuthority): AminoMsgSetAuthority['value'] => {
      return {
        denom,
        old_authority: oldAuthority,
        new_authority: newAuthority,
      };
    },
    fromAmino: ({
      denom,
      old_authority,
      new_authority,
    }: AminoMsgSetAuthority['value']): MsgSetAuthority => {
      return {
        $type: 'fanfury.fantoken.MsgSetAuthority',
        denom,
        oldAuthority: old_authority,
        newAuthority: new_authority,
      };
    },
  },
  '/fanfury.fantoken.MsgSetUri': {
    aminoType: 'go-fanfury/fantoken/MsgSetUri',
    toAmino: ({
      authority,
      denom,
      uri,
    }: MsgSetUri): AminoMsgSetUri['value'] => {
      return {
        authority,
        denom,
        uri,
      };
    },
    fromAmino: ({
      authority,
      denom,
      uri,
    }: AminoMsgSetUri['value']): MsgSetUri => {
      return {
        $type: 'fanfury.fantoken.MsgSetUri',
        authority,
        denom,
        uri,
      };
    },
  },
};

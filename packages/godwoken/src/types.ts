import { Hash, HexNumber, HexString, Script } from "@ckb-lumos/base";

export type U32 = number;
export type U64 = bigint;
export type U128 = bigint;

export type HexU32 = HexNumber;
export type HexU64 = HexNumber;
export type HexU128 = HexNumber;

// null means `pending`
export type BlockParameter = U64 | null;

export interface LogItem {
  account_id: HexU32;
  // The actual type is `u8`
  service_flag: HexU32;
  data: HexString;
}

export interface RunResult {
  return_data: HexString;
  logs: LogItem[];
}

export interface RawL2Transaction {
  from_id: HexU32;
  to_id: HexU32;
  nonce: HexU32;
  args: HexString;
}

export interface L2Transaction {
  raw: RawL2Transaction;
  signature: HexString;
}

export interface L2TransactionWithStatus {
  transaction: L2Transaction;
  tx_status: {
    status: "committed" | "pending";
    block_hash?: Hash;
  };
}

export interface L2TransactionReceipt {
  tx_witness_hash: Hash;
  post_state: AccountMerkleState;
  read_data_hashes: Hash[];
  logs: LogItem[];
}

export interface AccountMerkleState {
  merkle_root: Hash;
  count: HexU32;
}

export enum EoaType {
  Eth = "Eth",
  Tron = "Tron",
}

export interface Eoa {
  typeHash: HexString;
  type: EoaType;
}

export enum BackendType {
  Unknown = "Unknown",
  Meta = "Meta",
  Sudt = "Sudt",
  Polyjuice = "Polyjuice",
  EthAddrReg = "EthAddrReg",
}
export interface BackendInfo {
  validatorScriptHash: HexString;
  generatorCodeHash: HexString;
  validatorScriptTypeHash: HexString;
  type: BackendType;
}

export enum GwScriptType {
  Deposit = "Deposit",
  Withdraw = "Withdraw",
  StateValidator = "StateValidator",
  StakeLock = "StakeLock",
  CustodianLock = "CustodianLock",
  ChallengeLock = "ChallengeLock",
  L1Sudt = "L1Sudt",
  L2Sudt = "L2Sudt",
  omniLock = "OmniLock",
}
export interface GwScript {
  typeHash: HexString;
  script: Script;
  type: GwScriptType;
}

export interface RollupCell {
  typeHash: HexString;
  script: Script;
}

export interface RollupConfig {
  RequiredStakingCapacity: HexNumber;
  ChallengeMaturityBlocks: HexNumber;
  FinalityBlocks: HexNumber;
  RewardBurnRate: HexNumber;
  CompatibleChainId: HexNumber;
}
export interface NodeInfo {
  backends: Array<BackendInfo>;
  eoas: Array<Eoa>;
  scripts: Array<GwScript>;
  rollupCell: RollupCell;
  rollupConfig: RollupConfig;
  version: string;
}

import Web3 from "web3";

import { NotImplemented } from "../../exceptions";
import { KeyValuePair } from "../../types";
import { Client, CollectionResponse } from "../contracts/client";
import { Block, Delegate, Peer, Transaction, Wallet } from "./dto";

export class Ethereum implements Client {
	readonly #connection;

	public constructor(peer: string) {
		this.#connection = new Web3(new Web3.providers.HttpProvider(peer));
	}

	public async getBlock(id: string): Promise<Block> {
		const result = await this.#connection.eth.getBlock(id, true);

		return new Block(result.data);
	}

	public async getBlocks(query?: KeyValuePair): Promise<CollectionResponse<Block>> {
		throw new NotImplemented(this.constructor.name, "getBlocks");
	}

	public async searchBlocks(query: KeyValuePair): Promise<CollectionResponse<Block>> {
		throw new NotImplemented(this.constructor.name, "searchBlocks");
	}

	public async getTransaction(id: string): Promise<Transaction> {
		const result = await this.#connection.eth.getTransaction(id);

		return new Transaction(result.data);
	}

	public async getTransactions(query?: KeyValuePair): Promise<CollectionResponse<Transaction>> {
		const endBlock: number = await this.#connection.eth.getBlockNumber();
		const startBlock: number = endBlock - 8640; // 24 hours

		const transactions: Transaction[] = [];
		for (let i = startBlock; i < endBlock; i++) {
			const block = await this.#connection.eth.getBlock(i, true);

			if (block && block.transactions) {
				for (const transaction of block.transactions) {
					if (
						query?.address === "*" ||
						query?.address === transaction.from ||
						query?.address === transaction.to
					) {
						transactions.push(new Transaction(transaction));
					}
				}
			}
		}

		return { meta: {}, data: transactions };
	}

	public async searchTransactions(query: KeyValuePair): Promise<CollectionResponse<Transaction>> {
		throw new NotImplemented(this.constructor.name, "searchTransactions");
	}

	public async getWallet(id: string): Promise<Wallet> {
		const result = await this.#connection.eth.getBalance(id);

		return new Wallet({ address: id, balance: result });
	}

	public async getWallets(query?: KeyValuePair): Promise<CollectionResponse<Wallet>> {
		throw new NotImplemented(this.constructor.name, "getWallets");
	}

	public async searchWallets(query: KeyValuePair): Promise<CollectionResponse<Wallet>> {
		throw new NotImplemented(this.constructor.name, "searchWallets");
	}

	public async getDelegate(id: string): Promise<Delegate> {
		throw new NotImplemented(this.constructor.name, "getDelegate");
	}

	public async getDelegates(query?: KeyValuePair): Promise<CollectionResponse<Delegate>> {
		throw new NotImplemented(this.constructor.name, "getDelegates");
	}

	public async getPeers(query?: KeyValuePair): Promise<CollectionResponse<Peer>> {
		throw new NotImplemented(this.constructor.name, "getPeers");
	}

	public async getConfiguration(): Promise<any> {
		throw new NotImplemented(this.constructor.name, "getConfiguration");
	}

	public async getCryptoConfiguration(): Promise<any> {
		throw new NotImplemented(this.constructor.name, "getCryptoConfiguration");
	}

	public async getFeesByNode(days: number): Promise<any> {
		throw new NotImplemented(this.constructor.name, "getFeesByNode");
	}

	public async getFeesByType(): Promise<any> {
		const result = await this.#connection.eth.getGasPrice();

		return result;
	}

	public async getSyncStatus(): Promise<any> {
		const result = await this.#connection.eth.isSyncing();

		return result;
	}

	public async getBridgechainsByBusiness(address: string, query?: KeyValuePair): Promise<any> {
		throw new NotImplemented(this.constructor.name, "getBridgechainsByBusiness");
	}

	public async postTransactions(transactions: object[]): Promise<any> {
		throw new NotImplemented(this.constructor.name, "postTransactions");
	}
}

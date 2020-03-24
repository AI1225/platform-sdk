import { Connection } from "@arkecosystem/client";

import { Client, HttpQuery } from "../contracts/client";
import { Block, Transaction, Wallet } from "./client/dto";

export class Ark implements Client {
	private readonly connection: Connection;

	public constructor(readonly peer: string) {
		this.connection = new Connection(peer);
	}

	public async getBlock(id: string): Promise<Block> {
		const { body } = await this.connection.api("blocks").get(id);

		return new Block(body.data);
	}

	public async getBlocks(query?: HttpQuery): Promise<Block[]> {
		const { body } = await this.connection.api("blocks").all(query);

		return body.data.map((block) => new Block(block));
	}

	public async searchBlocks(query: HttpQuery): Promise<Block[]> {
		const { body } = await this.connection.api("blocks").search(query);

		return body.data.map((block) => new Block(block));
	}

	public async getTransaction(id: string): Promise<Transaction> {
		const { body } = await this.connection.api("transactions").get(id);

		return new Transaction(body.data);
	}

	public async getTransactions(query?: HttpQuery): Promise<Transaction[]> {
		const { body } = await this.connection.api("transactions").all(query);

		return body.data.map((transaction) => new Transaction(transaction));
	}

	public async searchTransactions(query: HttpQuery): Promise<Transaction[]> {
		const { body } = await this.connection.api("transactions").search(query);

		return body.data.map((transaction) => new Transaction(transaction));
	}

	public async getWallet(id: string): Promise<Wallet> {
		const { body } = await this.connection.api("wallets").get(id);

		return new Wallet(body.data);
	}

	public async getWallets(query?: HttpQuery): Promise<Wallet[]> {
		const { body } = await this.connection.api("wallets").all(query);

		return body.data.map((wallet) => new Wallet(wallet));
	}

	public async searchWallets(query: HttpQuery): Promise<Wallet[]> {
		const { body } = await this.connection.api("wallets").search(query);

		return body.data.map((wallet) => new Wallet(wallet));
	}
}
import "jest-extended";
import nock from "nock";

import { Tron } from "../../../src/coins/trx/client";
import { Block, Transaction, Wallet } from "../../../src/coins/trx/dto";

let subject: Tron;

beforeEach(() => (subject = new Tron("https://api.shasta.trongrid.io")));

beforeAll(() => nock.disableNetConnect());

describe("Tron", function () {
	describe("#getBlock", () => {
		it("should succeed", async () => {
			nock("https://api.shasta.trongrid.io")
				.post("/wallet/getblockbynum")
				.reply(200, require(`${__dirname}/__fixtures__/client/getBlock.json`));

			const result = await subject.getBlock("12345");

			expect(result).toBeInstanceOf(Block);
		});
	});

	describe("#getTransaction", () => {
		it("should succeed", async () => {
			nock("https://api.shasta.trongrid.io")
				.post("/wallet/gettransactionbyid")
				.reply(200, require(`${__dirname}/__fixtures__/client/getTransaction.json`));

			const result = await subject.getTransaction(
				"0daa9f2507c4e79e39391ea165bb76ed018c4cd69d7da129edf9e95f0dae99e2",
			);

			expect(result).toBeInstanceOf(Transaction);
		});
	});

	describe("#getWallet", () => {
		it("should succeed", async () => {
			nock("https://api.shasta.trongrid.io")
				.post("/walletsolidity/getaccount")
				.reply(200, require(`${__dirname}/__fixtures__/client/getWallet.json`));

			const result = await subject.getWallet("TTSFjEG3Lu9WkHdp4JrWYhbGP6K1REqnGQ");

			expect(result).toBeInstanceOf(Wallet);
		});
	});

	describe("#postTransactions", () => {
		it("should succeed", async () => {
			nock("https://api.shasta.trongrid.io")
				.post("/wallet/createtransaction")
				.reply(200, require(`${__dirname}/__fixtures__/client/postTransactions.json`))
				.post("/wallet/broadcasttransaction")
				.reply(200);

			const result = await subject.postTransactions([
				require(`${__dirname}/__fixtures__/crypto/createTransferSigned.json`),
			]);

			expect(result).toBeUndefined();
		});
	});
});

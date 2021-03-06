import "jest-extended";

import { Ark } from "../../../src/coins/ark/crypto";
import { Transactions } from "@arkecosystem/crypto";

let subject: Ark;

beforeEach(() => (subject = new Ark("devnet")));

describe("Ark", () => {
	describe("#createTransfer", () => {
		it("should verify", () => {
			const result: any = subject.createTransfer({
				nonce: 1,
				amount: 1,
				recipientId: "DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9",
				passphrase: "this is a top secret passphrase",
			});

			expect(Transactions.TransactionFactory.fromJson(result).verify()).toBeTrue();
		});
	});

	describe("#createSecondSignature", () => {
		it("should verify", () => {
			const result: any = subject.createSecondSignature({
				nonce: 1,
				passphrase: "this is a top secret passphrase",
				secondSignature: "this is a top secret passphrase",
			});

			expect(Transactions.TransactionFactory.fromJson(result).verify()).toBeTrue();
		});
	});

	describe("#createDelegateRegistration", () => {
		it("should verify", () => {
			const result: any = subject.createDelegateRegistration({
				nonce: 1,
				asset: "johndoe",
				passphrase: "this is a top secret passphrase",
			});

			expect(Transactions.TransactionFactory.fromJson(result).verify()).toBeTrue();
		});
	});

	describe("#createVote", () => {
		it("should verify", () => {
			const result: any = subject.createVote({
				nonce: 1,
				asset: ["+03bbfb43ecb5a54a1e227bb37b5812b5321213838d376e2b455b6af78442621dec"],
				passphrase: "this is a top secret passphrase",
			});

			expect(Transactions.TransactionFactory.fromJson(result).verify()).toBeTrue();
		});
	});

	describe("#createMultiSignature", () => {
		it("should verify", () => {
			const result: any = subject.createMultiSignature({
				nonce: 1,
				asset: {
					publicKeys: [
						"039180ea4a8a803ee11ecb462bb8f9613fcdb5fe917e292dbcc73409f0e98f8f22",
						"028d3611c4f32feca3e6713992ae9387e18a0e01954046511878fe078703324dc0",
						"021d3932ab673230486d0f956d05b9e88791ee298d9af2d6df7d9ed5bb861c92dd",
					],
					min: 2,
				},
				senderPublicKey: "039180ea4a8a803ee11ecb462bb8f9613fcdb5fe917e292dbcc73409f0e98f8f22",
				passphrases: [
					"this is a top secret passphrase 1",
					"this is a top secret passphrase 2",
					"this is a top secret passphrase 3",
				],
				passphrase: "this is a top secret passphrase 1",
			});

			expect(Transactions.TransactionFactory.fromJson(result).verify()).toBeTrue();
		});
	});

	describe("#createIpfs", () => {
		it("should verify", () => {
			const result: any = subject.createIpfs({
				nonce: 1,
				asset: "QmR45FmbVVrixReBwJkhEKde2qwHYaQzGxu4ZoDeswuF9w",
				passphrase: "this is a top secret passphrase",
			});

			expect(Transactions.TransactionFactory.fromJson(result).verify()).toBeTrue();
		});
	});

	describe("#createMultiPayment", () => {
		it("should verify", () => {
			const result: any = subject.createMultiPayment({
				nonce: 1,
				payments: [
					{ recipientId: "DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9", amount: 10 },
					{ recipientId: "DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9", amount: 10 },
					{ recipientId: "DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9", amount: 10 },
				],
				passphrase: "this is a top secret passphrase",
			});

			expect(Transactions.TransactionFactory.fromJson(result).verify()).toBeTrue();
		});
	});

	describe("#createDelegateResignation", () => {
		it("should verify", () => {
			const result: any = subject.createDelegateResignation({
				nonce: 1,
				passphrase: "this is a top secret passphrase",
			});

			expect(Transactions.TransactionFactory.fromJson(result).verify()).toBeTrue();
		});
	});

	describe("#createHtlcLock", () => {
		it("should verify", () => {
			const result: any = subject.createHtlcLock({
				nonce: 1,
				amount: 1,
				recipientId: "DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9",
				asset: {
					secretHash: "0f128d401958b1b30ad0d10406f47f9489321017b4614e6cb993fc63913c5454",
					expiration: {
						type: 1,
						value: Math.floor(Date.now() / 1000),
					},
				},
				passphrase: "this is a top secret passphrase",
			});

			expect(Transactions.TransactionFactory.fromJson(result).verify()).toBeTrue();
		});
	});

	describe("#createHtlcClaim", () => {
		it("should verify", () => {
			const result: any = subject.createHtlcClaim({
				nonce: 1,
				asset: {
					lockTransactionId: "943c220691e711c39c79d437ce185748a0018940e1a4144293af9d05627d2eb4",
					unlockSecret: "c27f1ce845d8c29eebc9006be932b604fd06755521b1a8b0be4204c65377151a",
				},
				passphrase: "this is a top secret passphrase",
			});

			expect(Transactions.TransactionFactory.fromJson(result).verify()).toBeTrue();
		});
	});

	describe("#createHtlcRefund", () => {
		it("should verify", () => {
			const result: any = subject.createHtlcRefund({
				nonce: 1,
				asset: {
					lockTransactionId: "943c220691e711c39c79d437ce185748a0018940e1a4144293af9d05627d2eb4",
				},
				passphrase: "this is a top secret passphrase",
			});

			expect(Transactions.TransactionFactory.fromJson(result).verify()).toBeTrue();
		});
	});
});

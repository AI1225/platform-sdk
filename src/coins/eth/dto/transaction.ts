import { BigNumber } from "@arkecosystem/utils";

import { KeyValuePair } from "../../../types";
import { Transaction as Contract } from "../../contracts/client";

export class Transaction implements Contract {
	readonly #data: KeyValuePair;

	public constructor(data: KeyValuePair) {
		this.#data = data;
	}

	public getId(): string {
		return this.#data.hash;
	}

	public getType(): number | undefined {
		return undefined;
	}

	public getTypeGroup(): number | undefined {
		return undefined;
	}

	public getTimestamp(): number | undefined {
		return undefined;
	}

	public getConfirmations(): BigNumber {
		return BigNumber.make(0);
	}

	public getNonce(): string {
		return this.#data.nonce;
	}

	public getSender(): string {
		return this.#data.from;
	}

	public getRecipient(): string {
		return this.#data.to;
	}

	public getAmount(): BigNumber {
		return BigNumber.make(this.#data.value);
	}

	public getFee(): BigNumber {
		return BigNumber.make(this.#data.gas);
	}

	public getVendorField(): string | undefined {
		return this.#data.data;
	}

	public getBlockId(): string {
		return this.#data.blockNumber;
	}

	/**
	 * Only use this function if you can ensure that the unnormalised data is handled!
	 */
	public toObject(): KeyValuePair {
		return this.#data;
	}
}

import { MongoId } from "./mongo-id.model";

export class Bill {
	_id: MongoId;
	AccountId: MongoId;
	AccountName: string;
	Date: Date;
	Amount: number;
}
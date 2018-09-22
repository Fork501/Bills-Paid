import { MongoId } from "./mongo-id.model";

export class Paycheck {
	_id: MongoId;
	Date: Date;
	Amount: number;
}
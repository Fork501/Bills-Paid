import { MongoId } from "./mongo-id.model";

export class Bill {
	_id: MongoId;
	Date: Date;
	Amount: number;
}
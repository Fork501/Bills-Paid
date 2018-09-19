import { MongoId } from "./mongo-id.model";

export class Account {
	_id: MongoId;
	Name: string;
	DayOfMonth: number;
	Active: boolean;
	Amount: number;
}
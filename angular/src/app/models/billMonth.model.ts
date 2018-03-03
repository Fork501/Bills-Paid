import { MongoId } from "./mongo-id.model";
import { Bill } from "./bill.model";

export class BillMonth {
	_id: MongoId;
	BillingMonth: Date;
	Bills: Bill[];
	BillsPaid: number;
}
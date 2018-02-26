"""Mongo implementation"""
from datetime import datetime
from dateutil import parser
from bson.codec_options import CodecOptions
from bson.objectid import ObjectId
import pymongo

from bills_paid.settings import MONGO_ENDPOINT

class MongoClient(object):
	"""Mongo client manager"""
	def __init__(self):
		client = pymongo.MongoClient(MONGO_ENDPOINT, tz_aware=False)
		self.db_conn = client.bills_paid

	# BEGIN Account

	def create_account(self, account):
		"""Insert a new account"""
		self.db_conn.account.insert(account)

	def delete_account(self, account_id):
		"""Update an existing account"""
		self.db_conn.account.delete_one({'_id': ObjectId(account_id)})

	def get_all_accounts(self):
		"""Get a list of all accounts"""
		return self.db_conn.account.find().sort('Name', pymongo.ASCENDING)

	def get_accounts_count(self):
		"""Get a list of all accounts"""
		return self.db_conn.account.count()

	def update_account(self, account_id, account):
		"""Update an existing account"""
		self.db_conn.account.update_one({'_id': ObjectId(account_id)}, {'$set': account})

	# END Account

	# BEGIN Bill

	def get_billing_month(self, month, year):
		"""Retrieve a specified billing month"""
		return self.db_conn.bills.find_one({'BillingMonth': datetime(year, month, 1)})

	def create_bill(self, date, amount, account_id):
		"""Retrieve a specified billing month"""
		parsed_date = parser.parse(date)

		self.db_conn.bills.update(
			{'BillingMonth' : datetime(parsed_date.year, parsed_date.month, 1)},
			{
				'$push' :
				{
					'Bills' :
					{
						"_id" : ObjectId(),
						"AccountId" : ObjectId(account_id['$oid']),
						"Date" : datetime(parsed_date.year, parsed_date.month, parsed_date.day),
						"Amount" : amount
					}
				}
			},
			upsert=True)

	def update_bill(self, date, amount, account_id, bill_id, _id):
		"""Retrieve a specified billing month"""
		_id = ObjectId(_id)
		account_id = ObjectId(account_id['$oid'])
		bill_id = ObjectId(bill_id['$oid'])

		parsed_date = parser.parse(date)
		parsed_date = datetime(parsed_date.year, parsed_date.month, parsed_date.day)

		self.db_conn.bills.update(
			{
				'BillingMonth' : datetime(parsed_date.year, parsed_date.month, 1),
				'Bills._id' : _id
			},
			{
				'$set' :
				{
					'Bills.$' :
					{
						"_id" : bill_id,
						"AccountId" : account_id,
						"Date" : parsed_date,
						"Amount" : amount
					}
				}
			},
			upsert=False)

	# END Bill

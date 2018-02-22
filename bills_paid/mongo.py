"""Mongo implementation"""
import pymongo
from dateutil import parser
from bson.objectid import ObjectId
from bills_paid.settings import MONGO_ENDPOINT
from datetime import datetime

class MongoClient(object):
	"""Mongo client manager"""
	def __init__(self):
		client = pymongo.MongoClient(MONGO_ENDPOINT)
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

	def upsert_billing(self, date, amount, account_id):
		"""Retrieve a specified billing month"""
		parsed_date = parser.parse(date)
		self.db_conn.bills.update(
			{'BillingMonth' : datetime(parsed_date.year, parsed_date.month, 1)},
			{
				'$push' :
				{
					'Bills' :
					{
						"Date" : datetime(parsed_date.year, parsed_date.month, parsed_date.day),
						"Amount" : amount,
						"AccountId" : account_id
					}
				}
			},
			upsert = True)

	# END Bill

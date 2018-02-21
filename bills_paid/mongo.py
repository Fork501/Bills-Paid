"""Mongo implementation"""
import pymongo
from bson.objectid import ObjectId
from bills_paid.settings import MONGO_ENDPOINT

class MongoClient(object):
	"""Mongo client manager"""
	def __init__(self):
		client = pymongo.MongoClient(MONGO_ENDPOINT)
		self.db_conn = client.bills_paid

	def get_all_accounts(self):
		"""Get a list of all accounts"""
		return self.db_conn.account.find().sort('Name', pymongo.ASCENDING)

	def get_accounts_count(self):
		"""Get a list of all accounts"""
		return self.db_conn.account.count()

	def create_account(self, account):
		"""Insert a new account"""
		self.db_conn.account.insert(account)

	def update_account(self, account_id, account):
		"""Update an existing account"""
		self.db_conn.account.update_one({'_id': ObjectId(account_id)}, {'$set': account})

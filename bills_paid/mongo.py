"""Mongo implementation"""
import pymongo
from bills_paid.settings import MONGO_ENDPOINT

class MongoClient(object):
	"""Mongo client manager"""
	def __init__(self):
		client = pymongo.MongoClient(MONGO_ENDPOINT)
		self.db_conn = client.bills_paid

	def insert_account(self, account):
		"""Insert a new account"""
		self.db_conn.account.insert(account)

	def get_all_accounts(self):
		"""Get a list of all accounts"""
		return self.db_conn.account.find()

	def get_accounts_count(self):
		"""Get a list of all accounts"""
		return self.db_conn.account.count()

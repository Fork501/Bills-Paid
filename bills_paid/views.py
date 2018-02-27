"""Pyramid views"""
import json
from dateutil import parser
from bson import json_util
from bson.json_util import JSONOptions
from pyramid.view import view_config, view_defaults
from bills_paid.mongo import MongoClient


@view_defaults(route_name='apiAccount', renderer='json')
class AccountApi(object):
	"""API methods for /account"""
	def __init__(self, request):
		self.request = request
		self.mongo_client = MongoClient()

	@view_config(route_name='apiAccountCreate', request_method='POST')
	def create_account(self):
		"""Creates a new account"""
		res = json.loads(self.request.body)
		self.mongo_client.create_account(
			{
				'Name' : res['Name'],
				'DayOfMonth' : res['DayOfMonth'],
				'Active' : res['Active']
			})
		return {'Result' : 'Success'}

	# This needs to be updated
	# If an account was used in a bill, it should deny deletion
	@view_config(route_name='apiAccountDelete', request_method='DELETE')
	def delete_account(self):
		"""Deletes an existing account"""
		account_id = self.request.matchdict["accountId"]
		self.mongo_client.delete_account(account_id)
		return {'Result' : 'Success'}

	@view_config(request_method='GET')
	def get_accounts(self):
		"""Retrieve all accounts"""
		return [
			json.dumps
			(
				account,
				default=json_util.default
			) for account in self.mongo_client.get_all_accounts()
		]

	@view_config(route_name='apiAccountCount', request_method='GET')
	def get_accounts_count(self):
		"""Retrieve number of accounts"""
		return json.dumps(self.mongo_client.get_accounts_count(), default=json_util.default)

	@view_config(route_name='apiAccountUpdate', request_method='PUT')
	def update_account(self):
		"""Updates an existing account"""
		account_id = self.request.matchdict["accountId"]
		res = json.loads(self.request.body)
		self.mongo_client.update_account(
			account_id,
			{
				'Name' : res['Name'],
				'DayOfMonth' : res['DayOfMonth'],
				'Active' : res['Active']
			}
		)
		return {'Result' : 'Success'}

@view_defaults(route_name='billsPaidApi', renderer='json')
class BillsPaidApi(object):
	"""API methods for /billspaid"""
	def __init__(self, request):
		self.request = request
		self.mongo_client = MongoClient()

	@view_config(route_name="apiBillsCreate", request_method="POST")
	def create_bill(self):
		"""Creates a line item for a bill"""
		res = json.loads(self.request.body)
		self.mongo_client.create_bill(res["Date"], res['Amount'], res['AccountId'])
		return {'Result' : 'Success'}

	@view_config(route_name='apiBillsDelete', request_method='DELETE')
	def delete_bill(self):
		"""Deletes an existing account"""
		bill_id = self.request.matchdict["billId"]
		self.mongo_client.delete_bill(bill_id)
		return {'Result' : 'Success'}

	@view_config(route_name='apiBillsGetMonth', request_method='GET')
	def get_billing_month(self):
		"""
			Retrieve bills for a specific month
			URL Input: /{date}: Any date within the month
			Output: The full month object
		"""
		date = self.request.matchdict["date"]
		date_parsed = parser.parse(date)
		billing_month = self.mongo_client.get_billing_month(date_parsed.month, date_parsed.year)
		options = JSONOptions(datetime_representation=json_util.DatetimeRepresentation.ISO8601)

		accounts = self.mongo_client.get_all_accounts()
		accounts_list = {}
		for account in accounts:
			accounts_list[account['_id']] = account['Name']

		if billing_month:
			for bill in billing_month['Bills']:
				bill['AccountName'] = accounts_list[bill['AccountId']]

		return json_util.dumps(billing_month, json_options=options)

	@view_config(route_name="apiBillsUpdate", request_method="PUT")
	def update_bill(self):
		"""Creates and updates a line item for a bill"""
		res = json.loads(self.request.body)
		self.mongo_client.update_bill(
			res["Date"],
			res['Amount'],
			res['AccountId'],
			res['_id'],
			self.request.matchdict['billId'])
		return {'Result' : 'Success'}

@view_defaults(renderer='index.html')
class BillsPaidViews(object):
	"""View routes"""
	def __init__(self, request):
			self.request = request

	@view_config(route_name='home')
	def home_view(self):
		"""Routes requests for /home to the home route"""
		return {'project': 'Bills-Paid'}

	@view_config(route_name='accounts')
	def accounts_view(self):
		"""Routes requests for /accounts to the accounts route"""
		return {'project': 'Bills-Paid'}

	@view_config(route_name='bills')
	def bills_view(self):
		"""Routes requests for /bills to the bills route"""
		return {'project': 'Bills-Paid'}

	@view_config(route_name='dashboard')
	def dashboard_view(self):
		"""Routes requests for /dashboard to the dashboard route"""
		return {'project': 'Bills-Paid'}

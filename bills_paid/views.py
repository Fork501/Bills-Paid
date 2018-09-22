"""Pyramid views"""
import json
from bson import json_util
from datetime import datetime
from bson.json_util import JSONOptions
from dateutil import parser
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
				'Name': res['Name'],
				'DayOfMonth': res['DayOfMonth'],
				'Amount': res['Amount'],
				'Active': res['Active']
			})
		return {'Success': True}

	# This needs to be updated
	# If an account was used in a bill, it should deny deletion
	@view_config(route_name='apiAccountDelete', request_method='DELETE')
	def delete_account(self):
		"""Deletes an existing account"""
		account_id = self.request.matchdict["accountId"]

		if self.mongo_client.count_bills_for_account(account_id):
			return {'Success': False, 'Message': 'Account appears in a billing month'}

		self.mongo_client.delete_account(account_id)
		return {'Success': True}

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
				'Name': res['Name'],
				'DayOfMonth': res['DayOfMonth'],
				'Amount': res['Amount'],
				'Active': res['Active']
			}
		)
		return {'Success': True}


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
		self.mongo_client.create_bill(res["Date"], res['Amount'], res['Posted'], res['AccountId']['$oid'])
		return {'Success': True}

	@view_config(route_name='apiBillsDelete', request_method='DELETE')
	def delete_bill(self):
		"""Deletes an existing account"""
		bill_id = self.request.matchdict["billId"]
		self.mongo_client.delete_bill(bill_id)
		return {'Success': True}

	@view_config(route_name='apiBillsGetMonth', request_method='GET')
	def get_billing_month(self):
		"""
			Retrieve bills for a specific month
			URL Input: /{date}: Any date within the month
			Output: The full month object
		"""
		date = self.request.matchdict["date"]
		date_parsed = parser.parse(date)
		billing_months = self.mongo_client.get_billing_month(date_parsed.month, date_parsed.year)

		accounts = self.mongo_client.get_all_accounts()
		accounts_list = {}
		for account in accounts:
			accounts_list[account['_id']] = account['Name']

		bills_paid = 0
		bills_pending = 0

		# Funky logic
		to_return = {}
		if billing_months:
			for billing_month in billing_months:
				to_return = billing_month
				if 'Bills' in to_return:
					for bill in to_return['Bills']:
						bill['AccountName'] = accounts_list[bill['AccountId']]
						if bill['Posted']:
							bills_paid += bill['Amount']
						else:
							bills_pending += bill['Amount']

		to_return['BillsPaid'] = bills_paid
		to_return['BillsPending'] = bills_pending

		options = JSONOptions(datetime_representation=json_util.DatetimeRepresentation.ISO8601)
		return json_util.dumps(to_return, json_options=options)

	@view_config(route_name='apiBillsGetUpcoming', request_method='GET')
	def get_upcoming_bills(self):
		current_bills = self.mongo_client.get_billing_month(datetime.now().month, datetime.now().year)

		accounts = list(self.mongo_client.get_active_accounts())

		for current_bill in current_bills:
			if 'Bills' in current_bill:
				for bill in current_bill['Bills']:
					for account in accounts:
						if account['_id'] == bill['AccountId']:
							account['Amount'] -= bill['Amount']

		accounts = [account for account in accounts if int(account['Amount']) > 0]
		bills_total = sum([account['Amount'] for account in accounts])
		to_return = {'Accounts': accounts, 'BillsTotal': bills_total}

		options = JSONOptions(datetime_representation=json_util.DatetimeRepresentation.ISO8601)
		return json_util.dumps(to_return, json_options=options)

	@view_config(route_name="apiBillsUpdate", request_method="PUT")
	def update_bill(self):
		"""Creates and updates a line item for a bill"""
		res = json.loads(self.request.body)
		self.mongo_client.update_bill(
			res["Date"],
			res['Amount'],
			res['Posted'],
			res['AccountId'],
			res['_id'],
			self.request.matchdict['billId'])
		return {'Success': True}


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

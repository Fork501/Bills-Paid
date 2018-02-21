"""Pyramid views"""
import json
from bson import json_util
from pyramid.view import view_config, view_defaults
from bills_paid.mongo import MongoClient


class BillsPaidApi(object):
	"""API Routes"""
	def __init__(self, request):
		self.request = request
		self.mongo_client = MongoClient()

	"""
	@view_config(route_name='apiHello', renderer='json')
	def hello_world(self):
		my_response = [
			json.dumps
			(
				account,
				default=json_util.default
			) for account in self.mongo_client.get_all_accounts()
		]

		my_response = "Hello, world"

		return my_response
	"""

@view_defaults(route_name='apiAccount', renderer='json')
class AccountApi(object):
	"""API methods for /account"""
	def __init__(self, request):
		self.request = request
		self.mongo_client = MongoClient()

	@view_config(request_method='POST')
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
		"""Creates a new account"""
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

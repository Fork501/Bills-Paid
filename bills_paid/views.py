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

	@view_config(route_name='apiHello', renderer='json')
	def hello_world(self):
		"""Hello, world!"""

		# self.mongo_client.insert_account(account={'name' : 'My Account'})

		my_response = [
			json.dumps
			(
				account,
				default=json_util.default
			) for account in self.mongo_client.get_all_accounts()
		]

		return my_response

	@view_config(route_name='apiGoodbye', renderer='json')
	def goodbye_world(self):
		"""Goodbye, world!"""
		my_response = {
			"message" : "Goodbye, world!"
		}
		return my_response


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

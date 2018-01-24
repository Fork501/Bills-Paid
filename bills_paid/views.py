"""Pyramid views"""
from pyramid.view import view_config, view_defaults


@view_defaults(renderer='index.html')
class BillsPaidViews:
	def __init__(self, request):
			self.request = request

	@view_config(route_name='home')
	def home_view(self):
		"""Routes requests for /home to the home route"""
		return {'project': 'Bills-Paid'}

	@view_config(route_name='bills')
	def bills_view(self):
		"""Routes requests for /bills to the bills route"""
		return {'project': 'Bills-Paid'}

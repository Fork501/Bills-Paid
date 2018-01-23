from pyramid.view import view_config, view_defaults


@view_defaults(renderer='index.html')
class BillsPaidViews:
	def __init__(self, request):
			self.request = request

	@view_config(route_name='home')
	def my_view(self):
			return {'project': 'Bills-Paid'}

	@view_config(route_name='bills')
	def my_view(self):
			return {'project': 'Bills-Paid'}


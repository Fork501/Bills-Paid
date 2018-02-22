"""Bills Paid"""
from pyramid.config import Configurator
from pyramid.view import view_config

API_ROUTES = [
	# Account
	{'route' : 'apiAccount', 'path' : '/account'},
	{'route' : 'apiAccountCount', 'path' : '/account/count'},
	{'route' : 'apiAccountDelete', 'path' : '/account/{accountId}'},
	{'route' : 'apiAccountUpdate', 'path' : '/account/{accountId}'},

	# Bills
	{'route' : 'apiBillsCreate', 'path' : '/bills'},
	{'route' : 'apiBillsGetMonth', 'path' : '/bills'}
]

VIEW_ROUTES = [
	{'route' : 'home', 'path' : '/'},
	{'route' : 'accounts', 'path' : '/accounts'},
	{'route' : 'bills', 'path' : '/bills'},
	{'route' : 'dashboard', 'path' : '/dashboard'}
]


def main(global_config, **settings):
	"""
	Entry point for the Bills Paid Pyramid application.
	global_config: Currently unused by this implementation
	settings: Properties are defined under [app:main] of either production.ini or development.ini
	"""

	config = Configurator(settings=settings)

	config.include('pyramid_chameleon')

	config.add_static_view('scripts', 'compiled/scripts', cache_max_age=0)
	config.add_static_view('styles', 'compiled/styles', cache_max_age=0)

	for route in VIEW_ROUTES:
		config.add_route(route['route'], route['path'])

	for route in API_ROUTES:
		config.add_route(route['route'], '/api{0}'.format(route['path']))

	config.scan()

	# Pyramid
	config.include('pyramid_jinja2')
	config.add_jinja2_renderer('.html')

	return config.make_wsgi_app()

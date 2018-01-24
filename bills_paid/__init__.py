"""Bills Paid"""
from pyramid.config import Configurator


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

	config.add_route('home', '/')
	config.add_route('bills', '/bills')

	config.scan()

	# Pyramid
	config.include('pyramid_jinja2')
	config.add_jinja2_renderer('.html')

	return config.make_wsgi_app()

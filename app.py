# app.py

from wsgiref.simple_server import make_server
from pyramid.config import Configurator
from pyramid.response import Response


def hello_world(request):
    print('Request inbound!')
    return Response('Docker still works with Pyramid!')


def echo_back(request):
    return Response('Found this: {0}'.format(request.matchdict['phr']))


if __name__ == '__main__':
    config = Configurator()
    config.add_route('hello', '/')
    config.add_route('echo', '/echo/{phr}')
    config.add_view(hello_world, route_name='hello')
    config.add_view(echo_back, route_name='echo')
    app = config.make_wsgi_app()
    server = make_server('0.0.0.0', 501, app)
    server.serve_forever()

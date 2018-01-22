from pyramid.view import view_config


@view_config(route_name='home', renderer='templates/src/index.html')
def my_view(request):
    return {'project': 'Bills-Paid'}

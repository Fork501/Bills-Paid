from pyramid.view import view_config


@view_config(route_name='home', renderer='compiled/index.html')
def my_view(request):
    return {'project': 'Bills-Paid'}

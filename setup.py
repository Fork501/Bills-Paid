import os

from setuptools import setup, find_packages

here = os.path.abspath(os.path.dirname(__file__))
with open(os.path.join(here, 'README.txt')) as f:
		README = f.read()
with open(os.path.join(here, 'CHANGES.txt')) as f:
		CHANGES = f.read()

REQUIRES = [
	'pymongo',
	'pyramid',
	'pyramid_chameleon',
	'pyramid_debugtoolbar',
	'pyramid_jinja2',
	'waitress',
]

TESTS_REQUIRE = [
		'WebTest >= 1.3.1',	# py3 compat
		'pytest',	# includes virtualenv
		'pytest-cov',
		]

setup(name='Bills-Paid',
			version='0.0',
			description='Bills-Paid',
			long_description=README + '\n\n' + CHANGES,
			classifiers=[
					"Programming Language :: Python",
					"Framework :: Pyramid",
					"Topic :: Internet :: WWW/HTTP",
					"Topic :: Internet :: WWW/HTTP :: WSGI :: Application",
			],
			author='',
			author_email='',
			url='',
			keywords='web pyramid pylons',
			packages=find_packages(),
			include_package_data=True,
			zip_safe=False,
			extras_require={
					'testing': TESTS_REQUIRE,
			},
			install_requires=REQUIRES,
			entry_points="""\
			[paste.app_factory]
			main = bills_paid:main
			""",
			)

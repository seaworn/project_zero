#!/user/bin/env python
import os
import shutil
import subprocess

import click

from app import create_app, db, models, forms

app = create_app()


# flask cli context
@app.shell_context_processor
def get_context():
    """Objects exposed here will be automatically available to the shell."""
    return dict(app=app, db=db, models=models, forms=forms)


@app.cli.command()
def create_db():
    """Create the configured database."""
    db.create_all()


@app.cli.command()
@click.confirmation_option(prompt='Drop all database tables?')
def drop_db():
    """Drop the current database."""
    db.drop_all()


@app.cli.command()
def build_react():
    """Build the react frontend."""
    react_base_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'frontend')
    react_build_dir = os.path.join(react_base_dir, 'build')
    dest_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'app', 'react-build')
    subprocess.run(['yarn', 'build'], check=True, cwd=react_base_dir)
    click.echo('Build complete. Copying files...')
    if os.path.exists(dest_dir):
        shutil.rmtree(dest_dir)
    shutil.copytree(react_build_dir, dest_dir)
    click.echo('Done!')


if __name__ == '__main__':
    app.run()

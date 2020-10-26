# lolPix ![Ruby/Rails](https://github.com/lolPix/lolPix/workflows/Ruby/Rails/badge.svg?branch=main) ![Brakeman Scan](https://github.com/lolPix/lolPix/workflows/Brakeman%20Scan/badge.svg?branch=main)

**Not yet usable!**
This is another try to implement lolPix. This time using Rails and React.

## Development

The project can be imported using RubyMine which will automatically detect run configurations (or at least wil ask to add them).

Before running, copy `.env.example` to `.env` and configure according to your setup.

After running, the server runs at `http://localhost:3000`.
There is a rudimentary start page at `/` and an API for posts at `/api/v1/posts`.

## Deploying lolPix

You need a server running Linux.

1. Create a new user: `adduser lolpix`
2. Clone the repo (as the new user): `git clone https://github.com/lolPix/lolPix.git ~/lolPix`
3. Install and configure redis
    - Redis should only listen on `localhost:6379`
    - TODO: Add link to docs
4. Install and configure PostgreSQL
    - TODO: Add link to docs
    - Use pgTune to better fit the PostgreSQL config to your setup
5. Install dependencies
    - Ruby: `bundle install`
    - JS: `yarn install --pure-lockfile`
6. Setup the DB
    1. Create it: `bundle exec rails db:create`
    2. Run migrations: `bundle exec rails db:migrate`
    3. Create initial data: `bundle exec rails db:seed`

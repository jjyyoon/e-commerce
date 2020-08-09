#!/usr/bin/env bash

set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE DATABASE ecommerce_db;
    GRANT ALL PRIVILEGES ON DATABASE ecommerce_db TO postgres;
EOSQL

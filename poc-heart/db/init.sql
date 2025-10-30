-- Active TimescaleDB à la création
CREATE EXTENSION IF NOT EXISTS timescaledb;

-- Exemple : création d'une table hypertable
CREATE TABLE IF NOT EXISTS sensor_data (
                                           time TIMESTAMP NOT NULL,
                                           sensor_id INTEGER,
                                           temperature DOUBLE PRECISION,
                                           humidity DOUBLE PRECISION
);

SELECT create_hypertable('sensor_data', 'time', if_not_exists => TRUE);

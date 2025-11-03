-- Active TimescaleDB à la création
CREATE EXTENSION IF NOT EXISTS timescaledb;

-- Exemple : création d'une table hypertable
CREATE TABLE IF NOT EXISTS heart_beats (
    time TIMESTAMP NOT NULL,
    sensor_id INTEGER NOT NULL,
    heart_beats DOUBLE PRECISION
);

SELECT create_hypertable('heart_beats', 'time', if_not_exists => TRUE);

ALTER TABLE heart_beats
    ADD PRIMARY KEY (sensor_id, time);

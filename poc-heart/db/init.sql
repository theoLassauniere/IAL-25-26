-- Active TimescaleDB à la création
CREATE EXTENSION IF NOT EXISTS timescaledb;

-- Exemple : création d'une table hypertable
CREATE TABLE IF NOT EXISTS heart_beats (
    time TIMESTAMP NOT NULL,
    sensor_id INTEGER,
    heart_beats DOUBLE PRECISION
);

SELECT create_hypertable('heart_beats', 'time', if_not_exists => TRUE);

-- Exemple d'insertion de données
INSERT INTO heart_beats (time, sensor_id, heart_beats) VALUES
('2024-01-01 00:00:00', 1, 72.5),
('2024-01-01 00:01:00', 1, 75.0),
('2024-01-01 00:02:00', 1, 73.8);

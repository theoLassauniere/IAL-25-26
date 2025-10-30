# Utiliser l'image officielle TimescaleDB
FROM timescale/timescaledb:latest-pg16

# (Optionnel) Copier un script SQL d'initialisation
# Si tu veux initialiser la DB avec des tables / données
COPY init.sql /docker-entrypoint-initdb.d/

# Exposer le port par défaut de PostgreSQL
EXPOSE 5400

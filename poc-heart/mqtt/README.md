Pour tester la queue MQTT, il suffit d'ouvrir un terminal dans le dossier poc-heart et d'exécuter la commande suivante pour écouter sur le topic :
```bash
docker exec -it mqtt-broker mosquitto_sub -h localhost -p 1883 -t sensor/heart_rate
```
Puis en ouvrant un terminal toujours dans le dossier poc-heart et en exécutant la commande suivante on va publier un message sur le topic :
```bash
docker exec -it mqtt-broker mosquitto_pub -h localhost -p 1883 -t sensor/heart_rate -m '{"bpm": 78}'
```

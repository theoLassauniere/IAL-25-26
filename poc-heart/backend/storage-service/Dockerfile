# Utilise une image OpenJDK
FROM openjdk:22-jdk-slim

# Définit le répertoire de travail
WORKDIR /app

# Copie le fichier jar compilé dans le conteneur
COPY target/*.jar app.jar

# Expose le port sur lequel Spring Boot tourne
EXPOSE 8081

# Commande pour lancer l'application
ENTRYPOINT ["java","-jar","app.jar"]

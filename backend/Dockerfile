FROM eclipse-temurin:21-jre
WORKDIR /app
COPY target/backend-1.0-jar-with-dependencies.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
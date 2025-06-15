# -------- Stage 1: Build the app --------
FROM maven:3.9.6-eclipse-temurin-21 AS builder
WORKDIR /app 
COPY . .
RUN mvn clean package -DskipTests


FROM eclipse-temurin:21-jdk-alpine

# COPY target/*.jar app.jar
# Copy built jar from the builder stage
COPY --from=builder /app/target/*.jar app.jar

ENTRYPOINT ["java", "-jar", "/app.jar"]

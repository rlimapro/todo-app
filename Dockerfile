# imagem do maven com java para compilar e gerar o arquivo .jar
FROM maven:3.8.4-openjdk-17-slim as builder
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# imagem do java para execução
FROM openjdk:17-slim
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 3000
ENTRYPOINT ["java", "-jar", "app.jar"]

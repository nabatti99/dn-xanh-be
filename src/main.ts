import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { APP_API_PREFIX, APP_CORS_ORIGINS, APP_PORT } from "./app.constants";
import { AppModule } from "./app.module";
import { AllExceptionsFilter, AppLoggerService, integrateSwagger } from "@common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: APP_CORS_ORIGINS.join(","),
    });
    app.setGlobalPrefix(APP_API_PREFIX);
    app.useLogger(new AppLoggerService());
    // app.useGlobalInterceptors(new TransformInterceptor());
    app.useGlobalFilters(new AllExceptionsFilter());
    app.useGlobalPipes(new ValidationPipe());

    const swaggerInfo = integrateSwagger(app);

    await app.listen(APP_PORT, () => {
        console.log(swaggerInfo);
    });
}
bootstrap();

import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { writeFileSync } from "fs";
import { dump } from "js-yaml";

export function integrateSwagger(app: INestApplication) {
    const title = "Server API";
    const description = "Server API Document";
    const version = "1.0.0";
    const docsPath = "docs";

    const options = new DocumentBuilder().setTitle(title).setDescription(description).setVersion(version).addBearerAuth().build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(docsPath, app, document);

    // Write Swagger specification to file
    writeFileSync("./swagger-spec.yaml", dump(document));

    // Render messages
    const messages = [`--- ${title} (Version: ${version}) ---`, description, `${process.env.APP_HOST || "localhost"}${process.env.APP_PORT && `:${process.env.APP_PORT}`}/docs`];
    messages.push([...Array(messages[0].length)].map(() => "-").join(""));

    return messages.join("\n");
}

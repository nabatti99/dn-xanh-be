import { Module } from "@nestjs/common";
import { UserModule } from "./modules/user/user.module";
import { DatabaseModule } from "./database/database.module";
import { JwtModule } from "@nestjs/jwt";
import { APP_SECRET } from "./common";

@Module({
    imports: [
        DatabaseModule,
        JwtModule.register({
            global: true,
            secret: APP_SECRET,
            signOptions: { expiresIn: "24h" },
        }),
        UserModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}

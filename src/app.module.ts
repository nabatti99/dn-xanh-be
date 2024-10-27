import { Module } from "@nestjs/common";
import { UserModule } from "./modules/user/user.module";
import { DatabaseModule } from "./database/database.module";
import { JwtModule } from "@nestjs/jwt";
import { APP_SECRET } from "./common";
import { SmartRecycleBinModule } from "@modules/smart-recycle-bin/smart-recycle-bin.module";
import { LandfillModule } from "@modules/landfill/landfill.module";
import { HealthyModule } from "@modules/healthy/healthy.module";

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: APP_SECRET,
            signOptions: { expiresIn: "24h" },
        }),
        DatabaseModule,
        HealthyModule,
        UserModule,
        SmartRecycleBinModule,
        LandfillModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}

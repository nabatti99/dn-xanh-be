import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import * as morgan from "morgan";

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
    private readonly logger = new Logger(AppLoggerMiddleware.name);

    use(req: any, res: any, next: () => void) {
        morgan(process.env.NODE_ENV === "production" ? "common" : "dev", {
            stream: {
                write: (message) => this.logger.log(message),
            },
        })(req, res, next);
    }
}

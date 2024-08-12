import 'module-alias/register';
import { build } from '@/app';

const app = build({logger: true});

const start = async () => {
    try {
        await app.listen({ host: '0.0.0.0', port: Number(process.env.PORT) || 12098 });

        app.log.info(`Server listening at 0.0.0.0:${process.env.PORT || 12098}`)

        if (process.send) {
            process.send('ready');
        }
    } catch (error) {
        app.log.error(error);
        process.exit(1);
    }
}

start();

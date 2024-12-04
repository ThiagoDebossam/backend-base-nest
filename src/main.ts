import { NestFactory } from '@nestjs/core'
import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { AppModule } from './app.module'
import { applyGlobalConfig } from './global-config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter(),
    )

    const config = new DocumentBuilder()
        .setTitle('Base backend NestJs para projetos')
        .setDescription('Rest API feito em NestJs com Typescript, DDD, Clen Architecture e testes automatizados')
        .setVersion('0.0.1')
        .addBearerAuth({
            description: 'Informar o JWT para autorizar o acesso',
            name: 'Authorization',
            scheme: 'Bearer',
            type: 'http',
            in: 'Header'
        })
        .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api', app, document)
    applyGlobalConfig(app)
    await app.listen(3000, '0.0.0.0')
}
bootstrap()

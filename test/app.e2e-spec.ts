import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { AppModule } from './../src/app.module.js';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.listen(0);
  });

  it('GET /transacoes - deve retornar metricas e historico', () => {
    return request(app.getHttpServer())
      .get('/transacoes')
      .expect(200)
      .expect((res) => {
        if (!res.body.metricas || !Array.isArray(res.body.historico)) {
          throw new Error('Metricas ou historico ausentes');
        }
      });
  });

  afterEach(async () => {
    await app.close();
  });
});

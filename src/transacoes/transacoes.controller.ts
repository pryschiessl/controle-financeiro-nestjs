import { Body, Controller, Get, Post } from '@nestjs/common';
import { TransacoesService } from './transacoes.service.js';

@Controller('transacoes')
export class TransacoesController {
  constructor(
    private readonly transacoesService: TransacoesService,
  ) {}

  @Post()
  criar(
    @Body()
    dados: {
      descricao: string;
      valor: number;
      tipo: 'receita' | 'despesa';
      categoria: string;
      consumoConsciente: boolean;
    },
  ) {
    return this.transacoesService.criar(dados);
  }

@Get()
listar() {
  return this.transacoesService.listar();
}

}



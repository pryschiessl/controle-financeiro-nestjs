
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Transacao,
  TransacaoDocument,
} from './schemas/transacao.schema.js';

@Injectable()
export class TransacoesService {
  constructor(
    @InjectModel(Transacao.name)
    private readonly transacaoModel: Model<TransacaoDocument>,
  ) {}

  async criar(dados: {
    descricao: string;
    valor: number;
    tipo: 'receita' | 'despesa';
    categoria: string;
    consumoConsciente: boolean;
  }) {
    const transacao = new this.transacaoModel(dados);
    return transacao.save();
  }

  async listar() {
  const transacoes = await this.transacaoModel.find().exec();

  const receitas = transacoes
    .filter((t) => t.tipo === 'receita')
    .reduce((total, t) => total + t.valor, 0);

  const totalDespesas = transacoes
    .filter((t) => t.tipo === 'despesa')
    .reduce((total, t) => total + t.valor, 0);

  const totalGastoImpulso = transacoes
    .filter((t) => t.tipo === 'despesa' && !t.consumoConsciente)
    .reduce((total, t) => total + t.valor, 0);

  return {
    transacoes,
    saldoTotal: receitas - totalDespesas,
    totalDespesas,
    totalGastoImpulso,
  };
}

}


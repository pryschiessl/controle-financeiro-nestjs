import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TransacaoDocument = HydratedDocument<Transacao>;

@Schema()
export class Transacao {
  @Prop({ required: true })
  descricao!: string;

  @Prop({ required: true, type: Number })
  valor!: number;

  @Prop({ required: true, enum: ['receita', 'despesa'] })
  tipo!: 'receita' | 'despesa';

  @Prop({ required: true })
  categoria!: string;

  @Prop({ required: true, type: Boolean })
  consumoConsciente!: boolean;
}

export const TransacaoSchema = SchemaFactory.createForClass(Transacao);

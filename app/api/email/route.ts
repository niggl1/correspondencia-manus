import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Templates
import { emailConfirmacaoCadastro, ConfirmacaoCadastroData } from '../../lib/email-templates/confirmacao-cadastro';
import { emailAprovacaoMorador, AprovacaoMoradorData } from '../../lib/email-templates/aprovacao-morador';
import { emailNovaCorrespondencia, NovaCorrespondenciaData } from '../../lib/email-templates/nova-correspondencia';
import { emailReciboRetirada, ReciboRetiradaData } from '../../lib/email-templates/recibo-retirada';
import { emailAvisoRapido, AvisoRapidoData } from '../../lib/email-templates/aviso-rapido';

type EmailRequestBody =
  | { tipo: 'confirmacao-cadastro'; destinatario: string; dados: ConfirmacaoCadastroData }
  | { tipo: 'aprovacao-morador'; destinatario: string; dados: AprovacaoMoradorData }
  | { tipo: 'nova-correspondencia'; destinatario: string; dados: NovaCorrespondenciaData }
  | { tipo: 'recibo-retirada'; destinatario: string; dados: ReciboRetiradaData }
  | { tipo: 'aviso-rapido'; destinatario: string; dados: AvisoRapidoData };

// Inicialização lazy do Resend para evitar erro durante o build
let resendInstance: Resend | null = null;

function getResend(): Resend {
  if (!resendInstance) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY não configurada. Configure no arquivo .env.local');
    }
    resendInstance = new Resend(apiKey);
  }
  return resendInstance;
}

export async function POST(request: NextRequest) {
  try {
    // Validar configuração de email
    const fromEmail = process.env.EMAIL_FROM;
    if (!fromEmail) {
      return NextResponse.json(
        { error: 'EMAIL_FROM não configurado. Configure no arquivo .env.local' },
        { status: 500 }
      );
    }

    const body = (await request.json()) as EmailRequestBody;
    const { tipo, destinatario, dados } = body;

    // Validações
    if (!tipo || !destinatario || !dados) {
      return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(destinatario)) {
      return NextResponse.json({ error: 'Email de destino inválido' }, { status: 400 });
    }

    let subject = '';
    let htmlContent = '';
    let attachments: { filename: string; path: string }[] = [];

    switch (tipo) {
      case 'confirmacao-cadastro':
        subject = '✅ Cadastro recebido! Aguardando aprovação';
        htmlContent = emailConfirmacaoCadastro(dados as ConfirmacaoCadastroData);
        break;

      case 'aprovacao-morador':
        subject = '🎉 Seu acesso foi aprovado!';
        htmlContent = emailAprovacaoMorador(dados as AprovacaoMoradorData);
        break;

      case 'nova-correspondencia':
        subject = '📬 Nova correspondência recebida';
        htmlContent = emailNovaCorrespondencia(dados as NovaCorrespondenciaData);
        break;

      case 'recibo-retirada':
        subject = '📋 Comprovante de retirada';
        htmlContent = emailReciboRetirada(dados as ReciboRetiradaData);
        break;

      case 'aviso-rapido':
        const avisoDados = dados as AvisoRapidoData;
        subject = `🔔 Aviso: ${avisoDados.titulo}`;
        htmlContent = emailAvisoRapido(avisoDados);

        // Se tiver URL da foto, adiciona como anexo
        if (avisoDados.fotoUrl) {
          attachments = [
            {
              filename: 'foto-aviso.jpg',
              path: avisoDados.fotoUrl,
            },
          ];
        }
        break;

      default:
        return NextResponse.json({ error: 'Tipo de email inválido' }, { status: 400 });
    }

    // Obter instância do Resend
    const resend = getResend();
    const replyToEmail = process.env.EMAIL_REPLY_TO;

    // Envio
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: destinatario,
      replyTo: replyToEmail,
      subject,
      html: htmlContent,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    if (error) {
      console.error('[Email API] Erro Resend:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log(`[Email API] Email enviado com sucesso: ${data?.id}`);
    return NextResponse.json({ success: true, emailId: data?.id });
  } catch (err: any) {
    console.error('[Email API] Erro interno:', err);
    return NextResponse.json(
      { error: err.message || 'Erro interno ao enviar email' },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  const hasApiKey = !!process.env.RESEND_API_KEY;
  const hasFromEmail = !!process.env.EMAIL_FROM;

  return NextResponse.json({
    status: hasApiKey && hasFromEmail ? 'configured' : 'missing_config',
    config: {
      RESEND_API_KEY: hasApiKey ? 'set' : 'missing',
      EMAIL_FROM: hasFromEmail ? 'set' : 'missing',
      EMAIL_REPLY_TO: process.env.EMAIL_REPLY_TO ? 'set' : 'not_set',
    },
  });
}

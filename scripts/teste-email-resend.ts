/**
 * Script de Teste - Envio de E-mail com Resend
 * 
 * Este script demonstra como enviar um e-mail usando a API do Resend
 * com as configurações do projeto Correspondência Manus.
 * 
 * Uso:
 *   npx ts-node scripts/teste-email-resend.ts
 * 
 * Ou em JavaScript puro:
 *   node scripts/teste-email-resend.js
 */

import { Resend } from 'resend';

// Configurações do Resend
const RESEND_API_KEY = 're_RMx7RFH8_YLmejuYa7ZkT1aakQ6hKTA8A';
const EMAIL_FROM = 'noreply@appcorrespondencia.com.br';

// Inicializar cliente Resend
const resend = new Resend(RESEND_API_KEY);

// Função para enviar e-mail de teste
async function enviarEmailTeste(destinatario: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: `App Correspondência <${EMAIL_FROM}>`,
      to: [destinatario],
      subject: '✉️ Teste de E-mail - App Correspondência',
      html: `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Teste de E-mail</title>
        </head>
        <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #057321 0%, #0a9e2e 100%); padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">📬 App Correspondência</h1>
              <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0 0; font-size: 14px;">Sistema de Gestão de Correspondências</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 30px;">
              <h2 style="color: #057321; margin-top: 0;">✅ E-mail de Teste Enviado com Sucesso!</h2>
              
              <p style="color: #333333; line-height: 1.6;">
                Este é um e-mail de teste para verificar se a integração com o <strong>Resend</strong> está funcionando corretamente.
              </p>
              
              <div style="background-color: #f8f9fa; border-left: 4px solid #057321; padding: 15px; margin: 20px 0; border-radius: 0 8px 8px 0;">
                <p style="margin: 0; color: #555555;">
                  <strong>Configurações Ativas:</strong><br>
                  📧 Remetente: ${EMAIL_FROM}<br>
                  🌐 Domínio: appcorrespondencia.com.br<br>
                  🔑 API: Resend
                </p>
              </div>
              
              <p style="color: #333333; line-height: 1.6;">
                Se você recebeu este e-mail, significa que o sistema está configurado corretamente e pronto para enviar notificações de correspondências.
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://correspondencia-manus.vercel.app" 
                   style="display: inline-block; background: linear-gradient(135deg, #057321 0%, #0a9e2e 100%); color: #ffffff; text-decoration: none; padding: 12px 30px; border-radius: 25px; font-weight: bold; box-shadow: 0 4px 15px rgba(5, 115, 33, 0.3);">
                  Acessar Sistema
                </a>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="color: #6c757d; font-size: 12px; margin: 0;">
                Este é um e-mail automático enviado pelo App Correspondência.<br>
                © 2026 App Correspondência - Todos os direitos reservados.
              </p>
            </div>
            
          </div>
        </body>
        </html>
      `,
      text: `
        App Correspondência - E-mail de Teste
        
        ✅ E-mail de Teste Enviado com Sucesso!
        
        Este é um e-mail de teste para verificar se a integração com o Resend está funcionando corretamente.
        
        Configurações Ativas:
        - Remetente: ${EMAIL_FROM}
        - Domínio: appcorrespondencia.com.br
        - API: Resend
        
        Se você recebeu este e-mail, significa que o sistema está configurado corretamente.
        
        Acesse: https://correspondencia-manus.vercel.app
        
        ---
        Este é um e-mail automático enviado pelo App Correspondência.
        © 2026 App Correspondência - Todos os direitos reservados.
      `,
    });

    if (error) {
      console.error('❌ Erro ao enviar e-mail:', error);
      return { success: false, error };
    }

    console.log('✅ E-mail enviado com sucesso!');
    console.log('📧 ID do e-mail:', data?.id);
    return { success: true, data };

  } catch (error) {
    console.error('❌ Erro inesperado:', error);
    return { success: false, error };
  }
}

// Função para enviar notificação de nova correspondência
async function enviarNotificacaoCorrespondencia(
  destinatario: string,
  nomeDestinatario: string,
  tipoCorrespondencia: string,
  bloco: string,
  unidade: string,
  dataRecebimento: string
) {
  try {
    const { data, error } = await resend.emails.send({
      from: `App Correspondência <${EMAIL_FROM}>`,
      to: [destinatario],
      subject: `📬 Nova ${tipoCorrespondencia} disponível para retirada`,
      html: `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            
            <div style="background: linear-gradient(135deg, #057321 0%, #0a9e2e 100%); padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">📬 Nova Correspondência</h1>
            </div>
            
            <div style="padding: 30px;">
              <p style="color: #333333; font-size: 16px;">
                Olá, <strong>${nomeDestinatario}</strong>!
              </p>
              
              <p style="color: #333333; line-height: 1.6;">
                Informamos que uma nova correspondência chegou para você e está disponível para retirada na portaria.
              </p>
              
              <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #6c757d;">Tipo:</td>
                    <td style="padding: 8px 0; color: #333333; font-weight: bold;">${tipoCorrespondencia}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6c757d;">Bloco:</td>
                    <td style="padding: 8px 0; color: #333333; font-weight: bold;">${bloco}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6c757d;">Unidade:</td>
                    <td style="padding: 8px 0; color: #333333; font-weight: bold;">${unidade}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6c757d;">Data:</td>
                    <td style="padding: 8px 0; color: #333333; font-weight: bold;">${dataRecebimento}</td>
                  </tr>
                </table>
              </div>
              
              <p style="color: #333333; line-height: 1.6;">
                Por favor, dirija-se à portaria para retirar sua correspondência.
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://correspondencia-manus.vercel.app" 
                   style="display: inline-block; background: linear-gradient(135deg, #057321 0%, #0a9e2e 100%); color: #ffffff; text-decoration: none; padding: 12px 30px; border-radius: 25px; font-weight: bold;">
                  Ver no Sistema
                </a>
              </div>
            </div>
            
            <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="color: #6c757d; font-size: 12px; margin: 0;">
                App Correspondência - Sistema de Gestão de Correspondências
              </p>
            </div>
            
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error('❌ Erro ao enviar notificação:', error);
      return { success: false, error };
    }

    console.log('✅ Notificação enviada com sucesso!');
    return { success: true, data };

  } catch (error) {
    console.error('❌ Erro inesperado:', error);
    return { success: false, error };
  }
}

// Executar teste se chamado diretamente
const args = process.argv.slice(2);
const emailDestino = args[0] || 'teste@exemplo.com';

console.log('🚀 Iniciando teste de envio de e-mail...');
console.log(`📧 Destinatário: ${emailDestino}`);
console.log('');

enviarEmailTeste(emailDestino).then((resultado) => {
  if (resultado.success) {
    console.log('');
    console.log('🎉 Teste concluído com sucesso!');
  } else {
    console.log('');
    console.log('⚠️ Teste falhou. Verifique as configurações.');
  }
});

// Exportar funções para uso em outros módulos
export { enviarEmailTeste, enviarNotificacaoCorrespondencia };

/**
 * Script de Teste - Envio de E-mail com Resend (JavaScript)
 * 
 * Este script demonstra como enviar um e-mail usando a API do Resend
 * com as configurações do projeto Correspondência Manus.
 * 
 * Instalação:
 *   npm install resend
 * 
 * Uso:
 *   node scripts/teste-email-resend.js seu-email@exemplo.com
 */

const { Resend } = require('resend');

// Configurações do Resend
const RESEND_API_KEY = 're_RMx7RFH8_YLmejuYa7ZkT1aakQ6hKTA8A';
const EMAIL_FROM = 'noreply@appcorrespondencia.com.br';

// Inicializar cliente Resend
const resend = new Resend(RESEND_API_KEY);

// Função para enviar e-mail de teste
async function enviarEmailTeste(destinatario) {
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

// Executar teste
const args = process.argv.slice(2);
const emailDestino = args[0];

if (!emailDestino) {
  console.log('');
  console.log('📧 Script de Teste de E-mail - App Correspondência');
  console.log('================================================');
  console.log('');
  console.log('Uso: node scripts/teste-email-resend.js <email-destino>');
  console.log('');
  console.log('Exemplo:');
  console.log('  node scripts/teste-email-resend.js meuemail@gmail.com');
  console.log('');
  process.exit(1);
}

console.log('');
console.log('🚀 Iniciando teste de envio de e-mail...');
console.log(`📧 Remetente: ${EMAIL_FROM}`);
console.log(`📧 Destinatário: ${emailDestino}`);
console.log('');

enviarEmailTeste(emailDestino).then((resultado) => {
  if (resultado.success) {
    console.log('');
    console.log('🎉 Teste concluído com sucesso!');
    console.log('📬 Verifique sua caixa de entrada (e spam).');
  } else {
    console.log('');
    console.log('⚠️ Teste falhou. Verifique as configurações.');
    process.exit(1);
  }
});

module.exports = { enviarEmailTeste };

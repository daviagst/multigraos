const http = require('http');
const nodemailer = require('nodemailer');
const port = process.env.PORT || 3000;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'SEUEMAIL@gmail.com',
    pass: 'SUA_SENHA_DE_APP'
  }
});


// Função para resposta JSON
function sendJson(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(body);
}

// Validação de email
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Validação de telefone (com ou sem +55)
function validatePhone(phone) {
  return /^(?:\+55\s?)?(?:\(?\d{2}\)?\s?)?\d{4,5}-?\d{4}$/.test(phone);
}

// Servidor
const server = http.createServer((req, res) => {

  // CORS preflight
  if (req.method === 'OPTIONS') {
    return sendJson(res, 204, {});
  }

  // ✅ ROTA PRINCIPAL
  if (req.url === '/' && req.method === 'GET') {
    return sendJson(res, 200, {
      message: 'Backend funcionando 🚀'
    });
  }

  // ✅ ROTA DE CONTATO
  if (req.url === '/contact' && req.method === 'POST') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      try {
        const data = JSON.parse(body || '{}');
        const { name, email, phone, message } = data;

        // Validação
        if (!name || !email || !phone || !message) {
          return sendJson(res, 400, {
            message: 'Todos os campos são obrigatórios.'
          });
        }

        if (!validateEmail(email)) {
          return sendJson(res, 400, {
            message: 'Email inválido.'
          });
        }

        if (!validatePhone(phone)) {
          return sendJson(res, 400, {
            message: 'Telefone inválido.'
          });
        }

        (async () => {
          try {
            await transporter.sendMail({
              from: '"Site Multigrãos" <SEUEMAIL@gmail.com>',
              to: 'SEUEMAIL@gmail.com',
              replyTo: email,
              subject: 'Novo contato do site',
              html: `
                <h2>Novo contato recebido</h2>
                <p><b>Nome:</b> ${name}</p>
                <p><b>Email:</b> ${email}</p>
                <p><b>Telefone:</b> ${phone}</p>
                <p><b>Mensagem:</b> ${message}</p>
              `
            });

            sendJson(res, 200, {
              success: true,
              message: 'Mensagem enviada com sucesso!'
            });

          } catch (error) {
            console.error('Erro ao enviar email:', error);

            sendJson(res, 500, {
              message: 'Erro ao enviar email.'
            });
          }
        })();

      } catch (error) {
        sendJson(res, 400, {
          message: 'Erro ao processar a solicitação.'
        });
      }
    });

    return;
  }

  // ✅ ROTA DE COTAÇÃO ONLINE
  if (req.url === '/quote' && req.method === 'POST') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      try {
        const data = JSON.parse(body || '{}');
        const { empresa, veiculo, produto, email, telefone, quantidade, origem, destino, roteiro, observacoes, newsletter } = data;

        if (!empresa || !veiculo || !produto || !email || !telefone || !quantidade || !origem || !destino || !roteiro || !observacoes) {
          return sendJson(res, 400, {
            message: 'Todos os campos obrigatórios da cotação devem ser preenchidos.'
          });
        }

        if (!validateEmail(email)) {
          return sendJson(res, 400, {
            message: 'Email inválido.'
          });
        }

        if (!validatePhone(telefone)) {
          return sendJson(res, 400, {
            message: 'Telefone inválido.'
          });
        }

        (async () => {
          try {
            await transporter.sendMail({
              from: '"Site Multigrãos" <SEUEMAIL@gmail.com>',
              to: 'SEUEMAIL@gmail.com',
              replyTo: email,
              subject: 'Nova cotação online recebida',
              html: `
                <h2>Nova cotação online</h2>
                <p><b>Empresa:</b> ${empresa}</p>
                <p><b>Tipo de veículo:</b> ${veiculo}</p>
                <p><b>Produto:</b> ${produto}</p>
                <p><b>Email:</b> ${email}</p>
                <p><b>Telefone:</b> ${telefone}</p>
                <p><b>Quantidade em toneladas:</b> ${quantidade}</p>
                <p><b>Origem:</b> ${origem}</p>
                <p><b>Destino:</b> ${destino}</p>
                <p><b>Roteiro de descargas:</b> ${roteiro}</p>
                <p><b>Observações:</b> ${observacoes}</p>
                <p><b>Receber informações:</b> ${newsletter ? 'Sim' : 'Não'}</p>
              `
            });

            sendJson(res, 200, {
              success: true,
              message: 'Cotação enviada com sucesso!'
            });

          } catch (error) {
            console.error('Erro ao enviar email da cotação:', error);

            sendJson(res, 500, {
              message: 'Erro ao enviar a cotação.'
            });
          }
        })();

      } catch (error) {
        sendJson(res, 400, {
          message: 'Erro ao processar a solicitação.'
        });
      }
    });

    return;
  }

  // ❌ ROTA NÃO ENCONTRADA
  sendJson(res, 404, {
    message: 'Endpoint não encontrado.'
  });

});

// Inicia servidor
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
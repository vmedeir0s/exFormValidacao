import express from 'express';
const PORT = 3000;

const app = express();

var clientes_DB = [];

const style = `
  <style>
    body {
      background-color: rgb(30 41 59);
      color: white;
    }

    .form-control {
      border-width: 1px;
    }

    .form-control:focus {
      border-color: #34d399;
      box-shadow: 0 0 0 0.1rem rgba(52, 211, 153, 1);
    }
    
    .btn-primary {
      background-color: #10b981;
      border:none;
      color: #374151;
      font-weight: 600;
    }

    .btn-primary:hover {
      background-color: #34d399;
      color: #374151;
    }

    a{
      color: #34d399;
      transition: color 0.3s ease;
    }

    a:hover {
      color: #10b981;
    }

  </style>
`;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="pt-br">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossorigin="anonymous"
        />
        ${style}
        <title>Início</title>
      </head>
      <body>
        <div class="container mt-1 flex-column align-items-center">
          <nav class="navbar navbar-light border-bottom">
            <div class="container-fluid justify-content-start">
              <a href="/" class="px-3">Início</a>
              <a href="/cadastrarcliente" class="px-3">Cadastrar Empresa</a>
            </div>
          </nav>
          <footer class="mt-5 text-center">
            <p>
              Desenvolvido por
                <a 
                  href="https://www.github.com/vmedeir0s/"
                  target="_blank"
                  >Vinicius de Medeiros
                </a>👨‍💻
            </p>
          </footer>
        </div>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
          crossorigin="anonymous"
        ></script>
      </body>
    </html>
  `);
});

app.get('/cadastrarcliente', (_req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="pt-br">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossorigin="anonymous"
        />
        ${style}
        <title>Cadastro de Empresa</title>
      </head>
      <body>
        <div class="container mt-1 flex-column align-items-center">
          <nav class="navbar navbar-light border-bottom">
            <div class="container-fluid justify-content-start">
              <a href="/" class="px-3">Início</a>
              <a href="/cadastrarcliente" class="px-3">Cadastrar Empresa</a>
            </div>
          </nav>
          <h1 class="text-center my-5">Cadastro de Empresa</h1>
          <form method="POST" action="/cadastrarcliente">
            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="empCNPJ">CNPJ:</label>
                <input type="text" class="form-control" name="empCNPJ" id="empCNPJ" />
              </div>
              <div class="form-group">
                <label class="form-label" for="empSocial">Razão Social:</label>
                <input type="text" class="form-control" name="empSocial" id="empSocial" />
              </div>
              <div class="form-group">
                <label class="form-label" for="empFantasia">Nome Fantasia:</label>
                <input type="text" class="form-control" name="empFantasia" id="empFantasia" />
              </div>
              <div class="form-group">
                <label for="empAddress">Endereço</label>
                <input type="text" class="form-control" name="empAddress" id="empAddress" />
              </div>
              <div class="form-row d-flex justify-content-between">
                <div class="form-group col-md-6">
                  <label for="empCity">Cidade</label>
                  <input type="text" class="form-control" name="empCity" id="empCity" />
                </div>
                <div class="form-group col-md-5">
                  <label for="empState">Estado</label>
                  <select name="empState" id="empState" class="form-control">
                    <option selected hidden>Escolha...</option>
                    <option value="AC">Acre</option>
                    <option value="AL">Alagoas</option>
                    <option value="AP">Amapá</option>
                    <option value="AM">Amazonas</option>
                    <option value="BA">Bahia</option>
                    <option value="CE">Ceará</option>
                    <option value="DF">Distrito Federal</option>
                    <option value="ES">Espírito Santo</option>
                    <option value="GO">Goiás</option>
                    <option value="MA">Maranhão</option>
                    <option value="MT">Mato Grosso</option>
                    <option value="MS">Mato Grosso do Sul</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="PA">Pará</option>
                    <option value="PB">Paraíba</option>
                    <option value="PR">Paraná</option>
                    <option value="PE">Pernambuco</option>
                    <option value="PI">Piauí</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="RN">Rio Grande do Norte</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="RO">Rondônia</option>
                    <option value="RR">Roraima</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="SP">São Paulo</option>
                    <option value="SE">Sergipe</option>
                    <option value="TO">Tocantins</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label class="form-label" for="empPhone">Telefone:</label>
                <input type="text" class="form-control" name="empPhone" id="empPhone" />
              </div>
              <div class="form-group">
                <label class="form-label" for="empEmail">Email:</label>
                <input type="text" class="form-control" name="empEmail" id="empEmail" />
              </div>
            </div>
            <button type="submit" class="btn btn-primary mt-3">Cadastrar</button>
          </form>
          <footer class="mt-5 text-center">
            <p>
              Desenvolvido por
                <a 
                  href="https://www.github.com/vmedeir0s/"
                  target="_blank"
                  >Vinicius de Medeiros
                </a>👨‍💻
            </p>
          </footer>
        </div>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
          crossorigin="anonymous"
        ></script>
      </body>
    </html>
  `);
});

app.post('/cadastrarcliente', (req, res) => {
  const {
    empCNPJ,
    empSocial,
    empFantasia,
    empAddress,
    empCity,
    empState,
    empPhone,
    empEmail,
  } = req.body;
  if (
    empCNPJ &&
    empSocial &&
    empFantasia &&
    empAddress &&
    empCity &&
    empState &&
    empPhone &&
    empEmail
  ) {
    const cliente = {
      empCNPJ,
      empSocial,
      empFantasia,
      empAddress,
      empCity,
      empState,
      empPhone,
      empEmail,
    };

    clientes_DB.push(cliente);

    res.write(`
    <!DOCTYPE html>
    <html lang="pt-br">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossorigin="anonymous"
        />
        ${style}
        <title>Lista de Clientes</title>
      </head>
      <body>
        <div class="container mt-1 flex-column align-items-center">
          <nav class="navbar navbar-light border-bottom">
            <div class="container-fluid justify-content-start">
              <a href="/" class="px-3">Início</a>
              <a href="/cadastrarcliente" class="px-3">Cadastrar Empresa</a>
            </div>
          </nav>
          <table class="table table-dark table-sm">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Nome</th>
                <th scope="col">Email</th>
                <th scope="col">Telefone</th>
                <th scope="col">Cidade</th>
                <th scope="col">Estado</th>
              </tr>
            </thead>
            <tbody>`);
    for (let i = 0; i < clientes_DB.length; i++) {
      res.write(` <tr>
                  <td scope="row">${i + 1}</td>
                  <td>${clientes_DB[i].userName}</td>
                  <td>${clientes_DB[i].userEmail}</td>
                  <td>${clientes_DB[i].userPhone}</td>
                  <td>${clientes_DB[i].userCity}</td>
                  <td>${clientes_DB[i].userState}</td>
                </tr>
    `);
    }

    res.write(`
            </tbody>
          </table>
          <footer class="mt-5 text-center">
            <p>
              Desenvolvido por
                <a 
                  href="https://www.github.com/vmedeir0s/"
                  target="_blank"
                  >Vinicius de Medeiros
                </a>👨‍💻
            </p>
          </footer>
        </div>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
          crossorigin="anonymous"
        ></script>
      </body>
    </html>
  `);
  }

  res.end();
});

app.listen(PORT, () => {
  console.log(`Aplicação rodando na porta: ${PORT}...`);
});

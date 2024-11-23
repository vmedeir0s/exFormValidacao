import express from 'express';
const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./pages/public'));

var produtos_DB = [];

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

    span {
      font-size: 0.875rem;
      color: #dc3545;
      margin-top: 0.25rem;
    }

  </style>
`;

app.get('/login', (_req, res) => {
  res.redirect('/login.html');
});

app.post('/login', (req, res) => {
  const { usuario, senha } = req.body;

  if (usuario == 'admin' && senha === '123') {
    res.redirect('/');
  } else {
    res.send(`
      <html>
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
        <title>Lista de produtos</title>
      </head>
        <body>
          <div class="container mt-1">
            <div class="alert alert-danger" role="alert">
              Usuário ou senha inválidos!
            </div> 
            <div>
              <a href="/login.html" class="btn btn-primary">Tentar novamente</a>
            </div>
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
});

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
              <a href="/cadastrarproduto" class="px-3">Cadastrar Produto</a>
              <a href="/listaprodutos" class="px-3">Listar Produtos</a>
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

app.get('/cadastrarproduto', (_req, res) => {
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
        <title>Cadastro de Produto</title>
      </head>
      <body>
        <div class="container mt-1 flex-column align-items-center">
          <nav class="navbar navbar-light border-bottom">
            <div class="container-fluid justify-content-start">
              <a href="/" class="px-3">Início</a>
              <a href="/cadastrarproduto" class="px-3">Cadastrar Produto</a>
              <a href="/listaprodutos" class="px-3">Listar Produtos</a>
            </div>
          </nav>
          <h1 class="text-center my-5">Cadastro de Produto</h1>
          <form method="POST" action="/cadastrarproduto">
            <div class="form-row">
              <div class="form-group mb-3">
                <label class="form-label" for="codBarras">Código de Barras:</label>
                <input type="text" class="form-control" name="codBarras" id="codBarras" />
              </div>
              <div class="form-group mb-3">
                <label class="form-label" for="descProd">Descrição Produto:</label>
                <input type="text" class="form-control" name="descProd" id="descProd" />
              </div>
              <div class="form-group mb-3">
                <label class="form-label" for="pcustoProd">Preço de Custo:</label>
                <input type="text" class="form-control" name="pcustoProd" id="pcustoProd" />
              </div>
              <div class="form-group mb-3">
                <label for="pvendaProd">Preço de Venda:</label>
                <input type="text" class="form-control" name="pvendaProd" id="pvendaProd" />
              </div>
              
              <div class="form-group mb-3">
                <label class="form-label" for="dataValid">Data de Válidade:</label>
                <input type="date" class="form-control" name="dataValid" id="dataValid" />
              </div>
              <div class="form-group mb-3">
                <label class="form-label" for="estoque">Quantidade em Estoque:</label>
                <input type="text" class="form-control" name="estoque" id="estoque" />
              </div>
              <div class="form-group mb-3">
                <label class="form-label" for="fornecedor">Nome do Fabricante:</label>
                <input type="text" class="form-control" name="fornecedor" id="fornecedor" />
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

app.post('/cadastrarproduto', (req, res) => {
  const {
    codBarras,
    descProd,
    pcustoProd,
    pvendaProd,
    dataValid,
    estoque,
    fornecedor,
  } = req.body;
  if (
    codBarras &&
    descProd &&
    pcustoProd &&
    pvendaProd &&
    dataValid &&
    estoque &&
    fornecedor
  ) {
    const produto = {
      codBarras,
      descProd,
      pcustoProd,
      pvendaProd,
      dataValid,
      estoque,
      fornecedor,
    };

    produtos_DB.push(produto);
    res.redirect('/listaprodutos');
  } else {
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
          <title>Cadastro de Produto</title>
        </head>
        <body>
          <div class="container mt-1 flex-column align-items-center">
            <nav class="navbar navbar-light border-bottom">
              <div class="container-fluid justify-content-start">
                <a href="/" class="px-3">Início</a>
                <a href="/cadastrarproduto" class="px-3">Cadastrar Produto</a>
                <a href="/listaprodutos" class="px-3">Listar Produtos</a>
              </div>
            </nav>
            <h1 class="text-center my-5">Cadastrado de Produtos</h1>
            <form method="POST" action="/cadastrarproduto">
            <div class="form-row">
              <div class="form-group mb-3">
                <label class="form-label" for="codBarras">Código de Barras:</label>
                <input type="text" class="form-control" name="codBarras" id="codBarras" value="${codBarras}"/>
    `);
    if (!codBarras) {
      res.write(`
        <span>Informe Código de Barras</span>
      `);
    }
    res.write(`
              </div>
              <div class="form-group mb-3">
                <label class="form-label" for="descProd">Descrição do Produto:</label>
                <input type="text" class="form-control" name="descProd" id="descProd" value="${descProd}"/>
    `);
    if (!descProd) {
      res.write(`
        <span>Informe a Descrição do Produto</span>
      `);
    }
    res.write(`
              </div>
              <div class="form-group mb-3">
                <label class="form-label" for="pcustoProd">Preço de Custo:</label>
                <input type="text" class="form-control" name="pcustoProd" id="pcustoProd" value="${pcustoProd}"/>
    `);
    if (!pcustoProd) {
      res.write(`
        <span>Informe o Preço de Custo</span>
      `);
    }
    res.write(`
              </div>
               <div class="form-group mb-3">
                <label for="pvendaProd">Preço de Venda:</label>
                <input type="text" class="form-control" name="pvendaProd" id="pvendaProd" value="${pvendaProd}"/>
    `);
    if (!pvendaProd) {
      res.write(`
        <span>Informe o Preço de Venda</span>
      `);
    }
    res.write(`
              </div>
                <div class="form-group mb-3">
                  <label for="dataValid">Data de Válidade</label>
                  <input type="text" class="form-control" name="dataValid" id="dataValid" value="${dataValid}"/>
    `);
    if (!dataValid) {
      res.write(`
        <span>Informe a Data de Válidade</span>
      `);
    }
    res.write(`
              </div>
              <div class="form-group  mb-3">
                  <label for="estoque">Quantidade em Estoque:</label>
                  <input type="text" class="form-control" name="estoque" id="estoque" value="${estoque}"/>
    `);
    if (!estoque) {
      res.write(`
        <span>Informe a Quantidade em Estoque</span>
      `);
    }
    res.write(`
              </div>
              <div class="form-group mb-3">
                <label class="form-label" for="fornecedor">Nome do Fabricante:</label>
                <input type="text" class="form-control" name="fornecedor" id="fornecedor" value="${fornecedor}"/>
    `);
    if (!fornecedor) {
      res.write(`
        <span>Informe o Nome do Fabricante</span>
      `);
    }
    res.write(`
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
  }

  res.end();
});

app.get('/listaprodutos', (_req, res) => {
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
        <title>Lista de Produtos</title>
      </head>
      <body>
        <div class="container mt-1 flex-column align-items-center">
          <nav class="navbar navbar-light border-bottom">
            <div class="container-fluid justify-content-start">
              <a href="/" class="px-3">Início</a>
              <a href="/cadastrarproduto" class="px-3">Cadastrar Produto</a>
              <a href="/listaprodutos" class="px-3">Listar Produtos</a>
            </div>
          </nav>
          <table class="table table-dark table-sm">
            <thead>
              <tr>
                <th scope="col">Código:</th>
                <th scope="col">Produto:</th>
                <th scope="col">Custo:</th>
                <th scope="col">Venda:</th>
                <th scope="col">Válidade:</th>
                <th scope="col">Estoque:</th>
                <th scope="col">Fornecedor:</th>
              </tr>
            </thead>
            <tbody>`);
  for (let i = 0; i < produtos_DB.length; i++) {
    res.write(` <tr>
                  <td scope="row">${produtos_DB[i].codBarras}</td>
                  <td scope="row">${produtos_DB[i].descProd}</td>
                  <td scope="row">${produtos_DB[i].pcustoProd}</td>
                  <td scope="row">${produtos_DB[i].pvendaProd}</td>
                  <td scope="row">${produtos_DB[i].fornecedor}</td>
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
});

app.listen(PORT, () => {
  console.log(`Aplicação rodando na porta: ${PORT}...`);
});

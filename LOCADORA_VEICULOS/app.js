// carregando os módulos
const express = require('express');                // a constante express recebe o módulo express
const handlebars = require('express-handlebars');  // a constante handlebars recebe o módulo express-handlebars
const bodyParser = require('body-parser');         // a constante bodyParser recebe o módulo body-parser
const app = express();
const admin = require('./routes/admin');           // linkando o arquivo admin de rotas no projeto
const path = require('path');
const mongoose = require('mongoose');              // carrega o mongoose
const flash = require('connect-flash');             // carrega o módulo flash
const session = require('express-session');        // carrega o módulo da sessão

// const mongoose = require('mongoose');           // a constante mongoose recebe o módulo mongoose

// configurações
//Sessão
app.use(session({              // cria a sessão
    secret: "cursodenode",     // a chave deve ser segura
    resave: true,
    saveUninitialized: true
}));
app.use(flash());              // essa configuração do flash deve ficar em baixo da sessão

// Midware
app.use((req, res, next) => {   // configurando o midware de validação
    res.locals.success_msg = req.flash('success_msg');  // guarda a mensagem de sucesso
    res.locals.error_msg = req.flash('error_msg')       // guarda a mensagem de falha
    next();                                             // nunca esquecer o next pois é um midware
})

// body parser
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

// handlebars
app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// Mongoose
    mongoose.Promise = global.Promise;               // comando recomendado para evitar erros
    mongoose.connect('mongodb://localhost/blogapp').then(() => { // verifica se deu certo a conexão
        console.log("Conectado ao mongo!");              // conectado com sucesso
}).catch((err) => {                                  // outro caso
    console.log("Erro ao se conectar!" +err);        // erro ao se conectar
});

// Public
app.use(express.static(path.join(__dirname, 'public'))); // pasta public guarda todos os arquivos estáticos
app.use((req, res, next) => {          // criação do midware
    console.log("Teste do midware");
    next();                            // não esquecer deste comando senão para a plicação
});

// Rotas (chamar abaixo ds configuraçoes)
app.use('/admin', admin);           // cria um grupo de rotas com o prefixo depois da barra


//Outros
const PORT  = 8081;                  // variável que armazena a porta
app.listen(PORT, () => {             // escuta a porta passando uma função da calback 
console.log("Servidor rodando!");  // exibe a mensagem assim que o servidor rodar
});
<!-- Este README foi baseado neste template: https://github.com/iuricode/readme-template/blob/main/README-repository/iuricode.md
Fique a vontade para conferir!-->

# Api-Ecommerce
**Projeto em desenvolvimento.**

## 📋 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

* Você instalou a versão mais recente de [nodeJS](https://nodejs.org/en)
* Você tem uma database criado no [Mongodb](https://www.mongodb.com)
* Você precisa do [Postman](https://www.postman.com/downloads) ou [Insomnia](https://insomnia.rest/download) para testar os endpoints
* Para enviar e receber os e-mails recomendo estar criando uma conta no [mailtrap](https://mailtrap.io/). Também é possível utilizar outros serviços mas vai exigir algumas alterações no código.

## 💻 Instalando Api-Ecommerce
Após [clonar o repositório](https://docs.github.com/pt/repositories/creating-and-managing-repositories/cloning-a-repository) no seu computador, você precisa instalar as dependências do projeto.

Abra uma interface de linha de comando no diretório da pasta e execute o comando a seguir:
```
npm install
```
O comando irá instalar todas as dependências necessárias para rodar o projeto.

## 🚀 Rodando o api-ecommerce
Após clonar e instalar o projeto e suas dependências, você vai precisar: 

Renomear e configurar o arquivo .env.example para .env é passar as informações de conexão do seu mongodb, email e jwt secret.

Da mesma forma que você fez anteriormente para instalar, abra uma interface de linha de comando no diretório da pasta e execute o comando a seguir:
```
npm run dev -> Para inicializar na máquina local. Link: http://localhost:8000

e

npm start -> Para ambiente de produção
```
Pronto, agora você ja pode começar a usar e testar a API!
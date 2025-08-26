# Base Node
FROM node:18

# Diretório de trabalho
WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do projeto
COPY . .

# Comando para rodar testes
CMD ["sh", "-c", "npm run test:API && mv mochawesome-report/api.html mochawesome-report/index.html"]

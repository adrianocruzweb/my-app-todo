# Use uma imagem base do Node.js
FROM node:18-alpine

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências da aplicação
RUN npm install

# Copie todos os arquivos da aplicação para dentro do container
COPY . .

# Exponha a porta que a aplicação irá usar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]

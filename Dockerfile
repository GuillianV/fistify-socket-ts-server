FROM node:18-alpine AS build

WORKDIR /app 
COPY . .
RUN npm install
ARG PORT "8888"  
ENV PORT=PORT
CMD ["npm", "run", "start"]
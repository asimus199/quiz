FROM node:14.15.3-alpine

# create destination directory
RUN mkdir -p /usr/src/services/app
WORKDIR /usr/src/services/app

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# copy the app, note .dockerignore
COPY . /usr/src/services/app
RUN npm install

# build necessary, even if no static files are needed,
# since it builds the server as well
RUN npm run build

ENV HOST 0.0.0.0
# expose 5000 on container
EXPOSE 3000

# set app serving to permissive / assigned
ENV NUXT_HOST=0.0.0.0
# set app port
ENV NUXT_PORT=3000

# start the app
CMD ["npm", "start"]

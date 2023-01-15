FROM nginx:1.19.0
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY . .
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
# 使用镜像
FROM node:14.16.0

# 设置容器内目录
WORKDIR /app

# 项目文件copy到容器 /app
COPY . .

# 下载并打包
RUN npm i && npm build

# 使用 nginx 镜像
FROM nginx
# 跳转到 nginx 的 80 静态服务对应的目录
WORKDIR /usr/share/nginx/html
# 删掉里面的文件
RUN rm -rf ./*
# 将我们在 node 镜像的打包文件拷贝到这里
COPY --from=build /app/build .

# 使用镜像
FROM node:14.16.0

# 设置容器内目录
WORKDIR /app

# 项目文件copy到容器 /app
COPY . .

# 下载并打包
RUN npm i && npm build

# Sử dụng image node chính thức
FROM node:20-alpine

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json và package-lock.json
COPY package*.json ./

# Cài đặt các phụ thuộc của dự án
RUN npm cache clean --force
RUN npm install -g yarn
RUN yarn install

# Sao chép mã nguồn của ứng dụng
COPY . .

# Mở cổng 3000
EXPOSE 3000

# Chạy ứng dụng
ENTRYPOINT [ "yarn", "dev" ]

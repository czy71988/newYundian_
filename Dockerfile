# build package
FROM registry.cn-beijing.aliyuncs.com/youmin/front-builder:0603 as builder

COPY . /workspace/
RUN yarn install && yarn build

# build image
FROM registry.cn-beijing.aliyuncs.com/youmin/nginx:v1.15.10

RUN rm -fr /usr/share/nginx/html/*
COPY --from=builder /workspace/dist /usr/share/nginx/html

FROM node:24-bookworm-slim
WORKDIR /app
COPY .server-output .server-output
COPY build/web-mobile build/web-mobile
RUN mkdir /data && chown node:node /data
USER node
ENV EMBER_HOST=0.0.0.0 PORT=8788 EMBER_DATA_DIR=/data
EXPOSE 8788
VOLUME ["/data"]
HEALTHCHECK --interval=30s --timeout=5s CMD node -e "fetch('http://127.0.0.1:'+process.env.PORT+'/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", ".server-output/server/main.js"]

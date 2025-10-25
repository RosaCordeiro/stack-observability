# Stack para linkar observabilidade dentro de APIs nodes

## O que é?
    Criei um pequeno repositório com as ferramentas mais simples e eficazes para monitoramento de APIs

## O que tem dentro?
    - Monitoramento de aplicações (OpenTelemetry)
    - Monitoramento de Logs (Loki)
    - Registro de métricas (Prometheus)
    - Visibilidade (Grafana)
    
## Como usar:
1. **Adicionar hosts a serem monitorados**
    - Os hosts serão monitorados na porta /metrics
    
2. **Iniciar os containers:**
   ```bash
   docker-compose up -d



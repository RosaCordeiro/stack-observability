// test-push.js - VERSÃO CORRIGIDA
const axios = require('axios');

class PushTester {
    constructor() {
        this.pushgatewayUrl = 'http://localhost:9091';
    }

    async pushMetric(metricName, value, labels = {}) {
        // FORMATO CORRETO para métricas
        let metricData = `# HELP ${metricName} Metric description\n`;
        metricData += `# TYPE ${metricName} gauge\n`;

        if (Object.keys(labels).length > 0) {
            const labelString = Object.entries(labels)
                .map(([k, v]) => `${k}="${v}"`)
                .join(',');
            metricData += `${metricName}{${labelString}} ${value}\n`;
        } else {
            metricData += `${metricName} ${value}\n`;
        }

        console.log('📤 Enviando métrica:');
        console.log(metricData);

        try {
            const response = await axios.post(
                `${this.pushgatewayUrl}/metrics/job/nodejs_app`,
                metricData,
                {
                    headers: { 'Content-Type': 'text/plain' }
                }
            );
            console.log(`✅ ${metricName} = ${value} enviado!`);
            return response;
        } catch (error) {
            console.error('❌ Erro:', error.response?.data || error.message);
        }
    }

    async runTest() {
        console.log('🚀 Iniciando teste do Push Gateway...\n');

        // Métricas de exemplo - FORMATO CORRETO
        await this.pushMetric('app_uptime_seconds', 1800);

        await this.pushMetric('http_requests_total', 1, {
            method: 'GET',
            endpoint: '/api/users',
            status_code: '200'
        });

        await this.pushMetric('http_requests_total', 1, {
            method: 'POST',
            endpoint: '/api/orders',
            status_code: '201'
        });

        await this.pushMetric('active_users', 42, {
            app: 'main_api'
        });

        await this.pushMetric('database_connections', 5, {
            type: 'pool'
        });

        await this.pushMetric('response_time_ms', 150, {
            endpoint: '/api_search'
        });

        console.log('\n📊 Teste concluído! Verifique: http://localhost:9090');
    }
}

// Executar teste
const tester = new PushTester();
tester.runTest();
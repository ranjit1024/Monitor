
### 2. Configure Prometheus

Create a `prometheus.yml` file inside the `prometheus` directory. This example configures Prometheus to scrape itself and the Node Exporter.

```yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  - job_name: 'node-exporter'
    static_configs:
      - targets: ['node-exporter:9100']
```

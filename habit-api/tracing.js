const { NodeSDK } = require('@opentelemetry/sdk-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');

const otlpTracesEndpoint =
  process.env.OTEL_EXPORTER_OTLP_TRACES_ENDPOINT ||
  'http://localhost:4318/v1/traces';

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter({
    url: otlpTracesEndpoint,
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

module.exports = sdk.start();
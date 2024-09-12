import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documentación Mentos API",
      description: "",
    },
  },
  apis: [`${__dirname}/../../docs/**/*.yaml`],
};

export default swaggerOptions;

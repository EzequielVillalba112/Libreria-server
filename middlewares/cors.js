import cors from 'cors'

export const corsMiddleware = () => cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Puedes ajustar los métodos permitidos según tus necesidades
  allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
  credentials: true, // Habilitar el envío de cookies de manera segura (si es necesario)
});

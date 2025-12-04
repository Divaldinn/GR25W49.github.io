// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

// Aumentamos el límite para que soporte archivos PPTX pesados
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Configuración de CORS para aceptar peticiones desde tu GitHub Pages
app.use(cors({
    origin: '*' // Cuando esté listo, cambia '*' por 'https://divaldinn.github.io'
}));

// Configura tu correo (Gmail requiere 'App Password', no tu contraseña normal)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tucorreo@gmail.com', // ⚠️ CAMBIA ESTO
        pass: 'tu_contraseña_de_aplicacion' // ⚠️ CAMBIA ESTO (Generar en Google Account > Security)
    }
});

app.post('/enviar-ppt', async (req, res) => {
    const { correos, nombreArchivo, archivo, mensaje } = req.body;

    try {
        // Convertir base64 a Buffer
        const base64Data = archivo.replace(/^data:application\/vnd.openxmlformats-officedocument.presentationml.presentation;base64,/, "");
        const buffer = Buffer.from(base64Data, 'base64');

        const mailOptions = {
            from: 'Reportes Convergint <tucorreo@gmail.com>',
            to: correos,
            subject: `Nuevo Reporte Generado: ${nombreArchivo}`,
            text: mensaje || 'Adjunto encontrarás el reporte de servicio.',
            attachments: [
                {
                    filename: nombreArchivo,
                    content: buffer
                }
            ]
        };

        await transporter.sendMail(mailOptions);
        console.log(`Correo enviado a: ${correos}`);
        res.status(200).json({ message: 'Correo enviado con éxito' });

    } catch (error) {
        console.error("Error enviando correo:", error);
        res.status(500).json({ error: 'Error al enviar el correo' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});

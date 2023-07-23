const app = require('./app')
const {PORT} = require('./settings/settings')

app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}....`);
});
const { pool } = require('../settings/configDB')

// Ejecuta una migración para crear una tabla
async function ejecutarMigracion() {
  try {
    await pool.query('CREATE TABLE NOTAS (ID SERIAL PRIMARY KEY, TITULO varchar(30) not null, DESCRIPCION varchar(200) null, FECHA varchar not null)');
    console.log('La migración se ejecutó correctamente.');
  } catch (error) {
    console.error('Error al ejecutar la migración:', error);
  } finally {
    pool.release();
  }
}

ejecutarMigracion();

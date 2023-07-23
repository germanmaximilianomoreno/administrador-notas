const { pool } = require('../settings/configDB')

async function getAllNotas(req, res) {
    try {
        const respuesta = await pool.query('SELECT * FROM notas')
        res.send(respuesta.rows);
    } catch (e) {
        res.status(500).send({ error: 'Error al obtener los datos', message: e.message})
    }
}

async function getNota(req, res) {
    const id = req.params.id
    try {
        const respuesta = await pool.query('SELECT * FROM notas WHERE id = $1', [id]);
        res.json(respuesta.rows);
    } catch (e) {
        res.status(500).send({ error: 'Error al obtener los datos', message: e.message });
    };
};

async function putNota(req, res) {
    const id = req.params.id
    const data = req.body
    try {
        const respuesta = await pool.query('UPDATE notas SET titulo = $1, descripcion = $2, fecha = $3 WHERE id = $4', [data.titulo, data.descripcion, data.fecha, id])

        if (respuesta.rowCount == 0) {
            return res.json({ message: 'No se encontró el registro con el ID especificado' });
        }
        res.json({ message: 'Datos actualizados correctamente' });

    } catch (e) {
        res.status(500).send({ error: 'Error al actualizar datos', message: e.message });
    }
}

async function postNota(req, res) {
    const datos = req.body
    try {
        const respuesta = await pool.query('INSERT INTO notas (titulo, descripcion, fecha) VALUES ($1, $2, $3)', [datos.titulo, datos.descripcion, datos.fecha]);

        if (respuesta.rowCount == 0) {
            return res.json({ message: 'No se pudieron agregar los datos' });
        }
        res.json({ message: 'Datos agregados correctamente' });

    } catch (e) {
        res.status(500).json({ error: 'Error al intentar postear datos', message: e.message });
    }
}

function deleteNota(req, res) {
    const id = req.params.id;

    try {
        const respuesta = pool.query('DELETE FROM notas WHERE id = $1', [id]);

        if (respuesta.rowCount == 0) {
            return res.json({message: 'No se puedieron eliminar los datos'})
        }
        res.json({message: 'Datos eliminados correctamente'});
    } catch (e) {
        res.status(500).json({error: 'Error al intentar eliminar el registro', message: e.message})
    }
}

module.exports = {
    getAllNotas,
    getNota,
    putNota,
    postNota,
    deleteNota
}
console.log('Ejecutando el servidor web')
const express = require('express')
const app = express()
const port = 3000
const mysql = require('mysql2/promise');

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: 'mysql-3c6f766c-cesarcolorado28-9cdb.e.aivencloud.com',
  user: 'avnadmin',
  database: 'defaultdb',  
  password: 'AVNS_Ht5qP0pk-qYPR7pgbGM',  
  port: 18222,
});

// Variable para guardar usuario y contraseña, y ruta /login para el inicio de sesión
app.get('/login',async (req, res) => {
    const user = req.query.user
    const pass = req.query.pass
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE usuario = ? AND clave = ?', [user, pass])
    if (rows.length > 0) {
        res.send('Usuario y clave correctos')
        res.end()
        return
    }
    res.send('Usuario o clave incorrectos')
    res.end()
    return

})
// Crear ruta para el registro de usuarios con usuario y clave  
app.get('/registro',async (req, res) => {
    const user = req.query.user
    const pass = req.query.pass
    const [result] = await pool.execute('INSERT INTO usuarios (usuario, clave) VALUES (?, ?)', [user, pass])
    if (result.affectedRows > 0) {
        res.send('Usuario registrado correctamente')
        res.end()
        return
    }
    res.send('Error al registrar el usuario')
    res.end()
    return  
})  


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
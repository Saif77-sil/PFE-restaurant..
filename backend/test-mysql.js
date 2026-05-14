const mysql = require('mysql2');

console.log('🔍 Test de connexion MySQL...');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'restaurant_db'
});

db.connect((err) => {
    if (err) {
        console.log('❌ ÉCHEC de connexion:');
        console.log('   Code:', err.code);
        console.log('   Message:', err.message);
        console.log('   Errno:', err.errno);
        
        if (err.code === 'ECONNREFUSED') {
            console.log('\n💡 SOLUTION: MySQL n\'est pas démarré !');
            console.log('   1. Installe XAMPP: https://www.apachefriends.org/');
            console.log('   2. Lance XAMPP Control Panel');
            console.log('   3. Clique sur "Start" pour MySQL');
        } else if (err.code === 'ER_BAD_DB_ERROR') {
            console.log('\n💡 SOLUTION: La base de données n\'existe pas !');
            console.log('   1. Installe phpMyAdmin ou MySQL Workbench');
            console.log('   2. Crée une base "restaurant_db"');
        } else if (err.code === 'ER_ACCESS_DENIED_ERROR') {
            console.log('\n💡 SOLUTION: Mot de passe incorrect !');
            console.log('   1. Vérifie user: "root"');
            console.log('   2. Vérifie password: laisse vide si pas de mot de passe');
        }
        
        process.exit(1);
    }
    
    console.log('✅ SUCCÈS: Connecté à MySQL !');
    
    // Test une requête simple
    db.query('SHOW TABLES', (err, results) => {
        if (err) {
            console.log('❌ Aucune table trouvée');
        } else {
            console.log('📋 Tables existantes:', results.map(r => Object.values(r)[0]));
        }
        db.end();
    });
});
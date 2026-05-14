const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Connexion à MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'restaurant_db'
});

db.connect((err) => {
    if (err) {
        console.error('❌ Erreur MySQL:', err.message);
        console.log('⚠️  Mode dégradé : utilisation de données factices');
    } else {
        console.log('✅ Connecté à MySQL');
    }
});

// Route pour récupérer toutes les tables
app.get('/api/tables', (req, res) => {
    // Si MySQL n'est pas connecté, on renvoie des données factices
    if (!db || !db._connectCalled) {
        return res.json({
            success: true,
            tables: getFakeTables()
        });
    }
    
    const query = `
        SELECT 
            t.id,
            t.table_number,
            t.status,
            IFNULL(o.total_amount, 0) as current_order_total
        FROM tables t
        LEFT JOIN orders o ON o.table_id = t.id AND o.status = 'en_cours'
        ORDER BY t.table_number
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erreur SQL:', err);
            return res.json({
                success: true,
                tables: getFakeTables()
            });
        }
        res.json({
            success: true,
            tables: results
        });
    });
});

// Route pour changer le statut d'une table
app.put('/api/tables/:id/status', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!db || !db._connectCalled) {
        return res.json({ success: true, message: 'Statut modifié (mode démo)' });
    }
    
    const query = 'UPDATE tables SET status = ? WHERE id = ?';
    db.query(query, [status, id], (err) => {
        if (err) {
            return res.status(500).json({ success: false, message: err.message });
        }
        res.json({ success: true, message: 'Statut mis à jour' });
    });
});

// Route pour récupérer les produits
app.get('/api/products', (req, res) => {
    res.json({
        success: true,
        products: getFakeProducts()
    });
});

// Route par défaut - sert directement l'interface
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/pages/index.html'));
});

// Données factices pour tester sans MySQL
function getFakeTables() {
    return [
        { id: 1, table_number: 1, status: 'libre', current_order_total: 0 },
        { id: 2, table_number: 2, status: 'occupee', current_order_total: 45.50 },
        { id: 3, table_number: 3, status: 'reservee', current_order_total: 0 },
        { id: 4, table_number: 4, status: 'libre', current_order_total: 0 },
        { id: 5, table_number: 5, status: 'occupee', current_order_total: 32.00 },
        { id: 6, table_number: 6, status: 'libre', current_order_total: 0 },
        { id: 7, table_number: 7, status: 'libre', current_order_total: 0 },
        { id: 8, table_number: 8, status: 'reservee', current_order_total: 0 },
        { id: 9, table_number: 9, status: 'libre', current_order_total: 0 },
        { id: 10, table_number: 10, status: 'occupee', current_order_total: 67.30 }
    ];
}

function getFakeProducts() {
    return [
        { id: 1, name: 'Coca-Cola', price: 2.50, category: 'Boissons' },
        { id: 2, name: 'Jus orange', price: 3.00, category: 'Boissons' },
        { id: 3, name: 'Café', price: 1.50, category: 'Boissons' },
        { id: 4, name: 'Pizza Margherita', price: 8.90, category: 'Plats' },
        { id: 5, name: 'Pizza Pepperoni', price: 10.90, category: 'Plats' },
        { id: 6, name: 'Burger', price: 9.50, category: 'Plats' },
        { id: 7, name: 'Tiramisu', price: 4.50, category: 'Desserts' }
    ];
}

app.listen(port, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${port}`);
    console.log(`📋 Va sur http://localhost:${port} pour voir les tables`);
});
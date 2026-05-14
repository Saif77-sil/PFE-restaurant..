module.exports = (db) => {
    const express = require('express');
    const router = express.Router();

    router.get('/', (req, res) => {
        const query = `
            SELECT 
                t.*,
                IFNULL(o.total_amount, 0) as current_order_total,
                o.created_at as order_start_time
            FROM tables t
            LEFT JOIN orders o ON o.table_id = t.id AND o.status = 'en_cours'
            ORDER BY t.table_number
        `;
        
        db.query(query, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ 
                    success: false, 
                    message: 'Erreur serveur' 
                });
            }
            
            res.json({
                success: true,
                tables: results
            });
        });
    });

    router.put('/:id/status', (req, res) => {
        const { id } = req.params;
        const { status } = req.body;
        
        const validStatuses = ['libre', 'occupee', 'reservee'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Statut invalide' 
            });
        }
        
        const query = 'UPDATE tables SET status = ? WHERE id = ?';
        db.query(query, [status, id], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ 
                    success: false, 
                    message: 'Erreur serveur' 
                });
            }
            
            res.json({
                success: true,
                message: 'Statut mis à jour'
            });
        });
    });

    return router;
};
app.get('/api/tables', (req, res) => {
    console.log('📥 Requête reçue sur /api/tables');
    
    const query = `
        SELECT 
            t.*,
            IFNULL(o.total_amount, 0) as current_order_total,
            o.created_at as order_start_time
        FROM tables t
        LEFT JOIN orders o ON o.table_id = t.id AND o.status = 'en_cours'
        ORDER BY t.table_number
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('❌ Erreur SQL:', err);
            return res.status(500).json({ 
                success: false, 
                message: 'Erreur serveur',
                error: err.message  // Ajoute le détail de l'erreur
            });
        }
        
        console.log('✅ Tables chargées:', results.length);
        res.json({
            success: true,
            tables: results
        });
    });
})
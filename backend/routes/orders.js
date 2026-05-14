module.exports = (db) => {
    const express = require('express');
    const router = express.Router();

    router.post('/', (req, res) => {
        const { 
            table_id, 
            user_id, 
            items, 
            kitchen_note 
        } = req.body;
        
        if (!table_id || !user_id || !items || items.length === 0) {
            return res.status(400).json({ 
                success: false, 
                message: 'Données incomplètes' 
            });
        }
        
        const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const currentTime = new Date();
        
        const checkQuery = 'SELECT id FROM orders WHERE table_id = ? AND status = "en_cours"';
        db.query(checkQuery, [table_id], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ 
                    success: false, 
                    message: 'Erreur serveur' 
                });
            }
            
            let orderId;
            
            if (results.length > 0) {
                orderId = results[0].id;
                const updateOrderQuery = `
                    UPDATE orders 
                    SET total_amount = ?, updated_at = ? 
                    WHERE id = ?
                `;
                db.query(updateOrderQuery, [totalAmount, currentTime, orderId], (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ 
                            success: false, 
                            message: 'Erreur mise à jour commande' 
                        });
                    }
                });
            } else {
                const createOrderQuery = `
                    INSERT INTO orders (table_id, user_id, total_amount, status, created_at, updated_at)
                    VALUES (?, ?, ?, 'en_cours', ?, ?)
                `;
                db.query(createOrderQuery, [table_id, user_id, totalAmount, currentTime, currentTime], (err, result) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ 
                            success: false, 
                            message: 'Erreur création commande' 
                        });
                    }
                    orderId = result.insertId;
                    
                    db.query('UPDATE tables SET status = "occupee" WHERE id = ?', [table_id]);
                });
            }
            
            const deleteDetailsQuery = 'DELETE FROM order_details WHERE order_id = ?';
            db.query(deleteDetailsQuery, [orderId], (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ 
                        success: false, 
                        message: 'Erreur suppression anciens détails' 
                    });
                }
                
                // Insérer les nouveaux détails
                const detailQueries = items.map(item => {
                    return new Promise((resolve, reject) => {
                        const insertDetailQuery = `
                            INSERT INTO order_details (order_id, product_id, quantity, price, kitchen_note)
                            VALUES (?, ?, ?, ?, ?)
                        `;
                        db.query(insertDetailQuery, 
                            [orderId, item.product_id, item.quantity, item.price, kitchen_note || null], 
                            (err) => {
                                if (err) reject(err);
                                else resolve();
                            }
                        );
                    });
                });
                
                Promise.all(detailQueries)
                    .then(() => {
                        res.json({
                            success: true,
                            order_id: orderId,
                            message: 'Commande enregistrée avec succès'
                        });
                    })
                    .catch(err => {
                        console.error(err);
                        res.status(500).json({ 
                            success: false, 
                            message: 'Erreur insertion détails' 
                        });
                    });
            });
        });
    });
    
    router.get('/table/:table_id', (req, res) => {
        const { table_id } = req.params;
        
        const query = `
            SELECT 
                o.id as order_id,
                o.total_amount,
                o.created_at,
                od.id as detail_id,
                od.quantity,
                od.price,
                od.kitchen_note,
                p.id as product_id,
                p.name as product_name
            FROM orders o
            LEFT JOIN order_details od ON od.order_id = o.id
            LEFT JOIN products p ON p.id = od.product_id
            WHERE o.table_id = ? AND o.status = 'en_cours'
        `;
        
        db.query(query, [table_id], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ 
                    success: false, 
                    message: 'Erreur serveur' 
                });
            }
            
            if (results.length === 0) {
                return res.json({
                    success: true,
                    has_order: false,
                    items: []
                });
            }
            
            const items = results
                .filter(row => row.product_id)
                .map(row => ({
                    detail_id: row.detail_id,
                    product_id: row.product_id,
                    product_name: row.product_name,
                    quantity: row.quantity,
                    price: parseFloat(row.price),
                    kitchen_note: row.kitchen_note
                }));
            
            res.json({
                success: true,
                has_order: true,
                order_id: results[0].order_id,
                total_amount: parseFloat(results[0].total_amount),
                created_at: results[0].created_at,
                items: items
            });
        });
    });
    
    router.put('/:order_id/complete', (req, res) => {
        const { order_id } = req.params;
        
        const query = 'UPDATE orders SET status = "terminee", completed_at = ? WHERE id = ?';
        db.query(query, [new Date(), order_id], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ 
                    success: false, 
                    message: 'Erreur serveur' 
                });
            }
            
            res.json({
                success: true,
                message: 'Commande finalisée'
            });
        });
    });
    
    return router;
};
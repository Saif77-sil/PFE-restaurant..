module.exports = (db) => {
    const express = require('express');
    const router = express.Router();

    router.get('/categories', (req, res) => {
        const query = `
            SELECT 
                c.id as category_id,
                c.name as category_name,
                p.id as product_id,
                p.name as product_name,
                p.price,
                p.description
            FROM categories c
            LEFT JOIN products p ON p.category_id = c.id AND p.active = 1
            WHERE c.active = 1
            ORDER BY c.display_order, p.name
        `;
        
        db.query(query, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ 
                    success: false, 
                    message: 'Erreur serveur' 
                });
            }
            
            // Organiser les données par catégorie
            const categories = {};
            results.forEach(row => {
                if (!categories[row.category_id]) {
                    categories[row.category_id] = {
                        id: row.category_id,
                        name: row.category_name,
                        products: []
                    };
                }
                if (row.product_id) {
                    categories[row.category_id].products.push({
                        id: row.product_id,
                        name: row.product_name,
                        price: parseFloat(row.price),
                        description: row.description
                    });
                }
            });
            
            res.json({
                success: true,
                categories: Object.values(categories)
            });
        });
    });

    return router;
};
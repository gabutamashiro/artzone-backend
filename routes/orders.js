module.exports = function ({ app, dbConn, upload }) {
  //CREATE
  app.post('/orders', (req, res) => {
    const seller_id = req.body.seller_id;
    const customer_id = req.body.customer_id;
    const product_id = req.body.product_id;
    const product_price = req.body.product_price;
    const payment_method = req.body.payment_method;
    const delivery_name = req.body.delivery_name;
    const delivery_email = req.body.delivery_email;
    const additional_info = req.body.additional_info;

    const createOrderSql = `INSERT INTO \`order\` (seller_id, customer_id, product_id, product_price, payment_method, delivery_name, delivery_email, additional_info) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [seller_id, customer_id, product_id, product_price, payment_method, delivery_name, delivery_email, additional_info];
    
    dbConn.query(createOrderSql, values, (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar o pedido.' });
      } else {
        res.status(201).json({ 
          orderId: result.insertId,
          message: 'Pedido criado com sucesso.' 
        });
      }
    });
  });

  //READ TYPE
  app.get('/orders', (req, res) => {
    const userId = req.query.user_id;
    const userType = req.query.user_type;

    let getOrdersSql;

    if (!userId || !userType) {
      res.status(400).json({ error: 'ID do usuário ou tipo de usuário não fornecido.' });
      return;
    }

    if (userType === 'buy') {
      // Compras
      getOrdersSql = `SELECT * FROM \`order\` WHERE customer_id = ?`;
    } else if (userType === 'sell') {
      // Vendas
      getOrdersSql = `SELECT * FROM \`order\` WHERE seller_id = ?`;
    } else {
      res.status(400).json({ error: 'Tipo de usuário inválido.' });
      return;
    }

    dbConn.query(getOrdersSql, [userId], (error, orders) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao obter os pedidos.' });
      } else {
        res.status(200).jsonp(orders);
      }
    });
  });

  //READ ID
  app.get('/orders/:id', (req, res) => {
    const orderID = req.params.id;

    if (!orderID) {
      res.status(400).json({ error: 'ID do pedido não fornecido.' });
      return;
    }

    getOrderSql = `SELECT * FROM \`order\` WHERE id = ?`;

    dbConn.query(getOrderSql, [orderID], (error, order) => {
      if (error) {
        console.error(error);
        res.status(500).json({error: 'Erro ao obter o pedido.'});
      } else {
        res.status(200).jsonp(order);
      }
    });
  });
};
import db from '../db/index.js';
import ErrorResponse from '../utils/ErrorResponse.js';

export const getProducts = async (req, res, next) => {
  
  try {
    const { rowCount, rows } = await db.query('SELECT * FROM products;');
    if (!rowCount) throw new ErrorResponse('No products', 404);
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
   try {
    const { rowCount, rows } = await db.query(
      `INSERT INTO products(name, description, stock, unit_price) VALUES($1, $2, $3, $4) RETURNING *`, 
      ['iphone14 pro max', 'iphone14 pro max', '200', '1500']
      );
    if (!rowCount) throw new ErrorResponse('No products', 404);
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

export const getProduct = (req, res) => {
  res.json({ msg: 'GET a product' });
};

export const updateProduct = (req, res) => {
  res.json({ msg: 'PUT a product' });
};

export const deleteProduct = (req, res) => {
  res.json({ msg: 'DELETE a product' });
};

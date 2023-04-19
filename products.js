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
    const {
      body: { name, description, stock, unitPrice }
    } = req;
    if (!name || !description || !stock || !unitPrice) throw new ErrorResponse(`Name, description, stock and unit price are required`, 400);
    const {
      rows: [newProduct]
    } = await db.query(`INSERT INTO products(name, description, stock, unit_price) VALUES($1, $2, $3, $4) RETURNING *`, [
      name,
      description,
      stock,
      unitPrice
    ]);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const {
      params: { id }
    } = req;
    const {
      rowCount,
      rows: [product]
    } = await db.query('SELECT * FROM products WHERE id = $1', [id]);
    if (!rowCount) throw new ErrorResponse(`Product with id of ${id} does not exist`, 404);
    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const {
      body: { name, description, stock, unitPrice },
      params: { id }
    } = req;
    if (!name || !description || !stock || !unitPrice) throw new ErrorResponse(`Name, description, stock and unit price are required`, 400);
    const {
      rowCount,
      rows: [product]
    } = await db.query('UPDATE products SET name = $1, description = $2, stock = $3, unit_price = $4 WHERE id = $5 RETURNING *', [
      name,
      description,
      stock,
      unitPrice,
      id
    ]);
    if (!rowCount) throw new ErrorResponse(`Product with id of ${id} does not exist`, 404);
    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const {
      params: { id }
    } = req;
    const { rowCount } = await db.query('DELETE FROM products WHERE id = $1', [id]);
    if (!rowCount) throw new ErrorResponse(`Product with id of ${id} does not exist`, 404);
    res.json({ msg: `Product with id of ${id} was deleted` });
  } catch (error) {
    next(error);
  }
};

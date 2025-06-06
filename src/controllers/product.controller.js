const Product = require("../models/product.model");

exports.createProduct = async (req, res) => {
  const { productname, type, cc, price } = req.body;
  try {
    const newProduct = await Product.create({ productname, type, cc, price });
    return res.json({ newProduct });
  } catch (error) {
    return res.status(500).json({
      msg: "Hubo un error al crear la Productra",
      error: error.message,
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const Products = await Product.find({});
    return res.json({ Products });
  } catch (error) {
    return res.status(500).json({
      msg: "Hubo un error al consultar las Productras",
      error: error.message,
    });
  }
};

exports.updateProductById = async (req, res) => {
  const { productname, type, cc, price } = req.body;
  try {
    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { productname, type, cc, price },
      { new: true, runValdators: true }
    );
    return res.json({ updateProduct });
  } catch (error) {
    return res.status(500).json({
      msg: "Hubo un error al actualizar la Productra",
      error: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deleteProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deleteProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    return res.status(200).json({ deleteProduct });
  } catch (error) {
    return res.status(500).json({
      msg: "Hubo un error al eliminar el producto",
      error: error.message,
    });
  }
};

const productService = require("../services/ProductService");
const mongoose = require("mongoose");

const addProduct = async (req, res) => {
  const { name, image, old_price, new_price, category, size, description } =
    req.body;

  if (
    !name ||
    !image ||
    !old_price ||
    !new_price ||
    !category ||
    !size ||
    size.length === 0 ||
    !description
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Thiếu thông tin sản phẩm" });
  }

  try {
    const newProduct = await productService.addProduct(req.body);
    res.status(201).json({
      success: true,
      product: newProduct,
      message: "Thêm sản phẩm thành công",
    });
  } catch (err) {
    console.error("Lỗi khi thêm sản phẩm:", err);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại." });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeProduct = async (req, res) => {
  const { id } = req.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    console.log("ID sản phẩm không hợp lệ:", id);
    return res.status(400).json({ message: "ID sản phẩm không hợp lệ." });
  }

  try {
    const updatedProduct = await productService.removeProductById(id);
    if (!updatedProduct) {
      return res.status(404).json({ message: "Sản phẩm không tìm thấy." });
    }
    res.json({ message: "Sản phẩm đã được xóa (soft delete)." });
  } catch (err) {
    console.error("Lỗi khi xóa sản phẩm:", err);
    res.status(500).json({ message: "Lỗi server khi xóa sản phẩm." });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const product = await productService.updateProduct(id, updatedData);
    res.status(200).json({ success: true, product });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  removeProduct,
  updateProduct,
  getProductById,
};

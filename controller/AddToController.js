const productTbl = require('../models/ProductTbl');

const addtocartTbl = require('../models/addToCartTbl');

const addtocart = async (req, res) => {
	try {
		const id = req.body.id;
		let product = await productTbl.findById(id);
		let addTocart = await addtocartTbl.create({
			categoryId: product.categoryId,
			subCategoryId: product.subCategoryId,
			pname: product.pname,
			price: product.price,
			qty: product.qty,
			desc: product.desc,
			image: product.image
		});
		if (addTocart) {
			return res.json({ status: 1, message: 'Add To Cart Successfully' });
		} else {
			return res.json({ status: 1, message: 'Add To Cart Not Successfully' });
		}
	} catch (err) {
		console.log(err);
		return false;
	}
}

const viewaddToCart = async (req, res) => {
	try {
		const viewData = await addtocartTbl.find({});
		if (viewData) {
			return res.json({ status: 1, message: viewData });
		}
		else {
			return res.json({ status: 0, message: 'Add To Cart Data Not Fetch' });
		}
	} catch (err) {
		console.log(err);
		return false;
	}
}

const deleteAddToCart = async (req, res) => {
	try {
		let id = req.query.id;
		let deleteCategory = await addtocartTbl.findByIdAndDelete(id);
		if (deleteCategory) {
			return res.json({ status: 1, message: 'Add To Cart Delete' });
		}
		else {
			return res.json({ status: 0, message: 'Add To Cart Not Delete' });
		}
	} catch (err) {
		console.log(err);
		return false;
	}
}

const updateaddToCart = async (req, res) => {
	try {
		const { id, qty } = req.body;
		const updateCart = await addtocartTbl.findByIdAndUpdate(id, {
			qty: qty
		});
		if (updateCart) {
			return res.json({ status: 1, message: 'Cart Update' });
		}
		else {
			return res.json({ status: 0, message: 'Cart Not Update' });
		}
	} catch (err) {
		console.log(err);
		return false;
	}
}

module.exports = {
	addtocart,
	viewaddToCart,
	deleteAddToCart,
	updateaddToCart
}
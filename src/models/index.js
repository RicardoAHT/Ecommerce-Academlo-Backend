const Cart = require("./Cart");
const Category = require("./Category");
const Image = require("./Image");
const Product = require("./Product");
const Purchase = require("./Purchase");
const User = require("./User");



/*Relacion uno a muchos */
Category.hasMany(Product)
Product.belongsTo(Category)

Product.hasMany(Image)
Image.belongsTo(Product)

Product.hasMany(Cart)
Cart.belongsTo(Product)

Cart.belongsTo(User)
User.hasMany(Cart)

Purchase.belongsTo(User)
User.hasMany(Purchase)

Product.hasMany(Purchase)
Purchase.belongsTo(Product)





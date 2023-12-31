const sequalize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequalize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: true
    },
    surname: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: true,
    },
    country: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: true,
    },
    city: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: true
    },
    phone: {
        type: DataTypes.BIGINT,
        unique: false,
        allowNull: true
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "USER"
    }
})

const Cart = sequalize.define('cart', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }
})

const CartProduct = sequalize.define('cart_product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }
})

const Product = sequalize.define('product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    img: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    article: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

const ProductInfo = sequalize.define('product_info', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    disclaimer: {
        type: DataTypes.STRING,
        allowNull: true
    },
})

const ProductDropdownInfo = sequalize.define('product_dropdown_info', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
})

const Type = sequalize.define('type', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    }
})

// --------------------Промежуточные таблицы--------------------<<<
const TypeColor = sequalize.define('type_color', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
})

const TypeSize = sequalize.define('type_size', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
})

const TypeVariety = sequalize.define('type_variety', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
})

const TypeLight = sequalize.define('type_light', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
})

const TypeMaterial = sequalize.define('type_material', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
})

const TypeBenefit = sequalize.define('type_benefit', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
})
// --------------------Промежуточные таблицы-------------------->>>

// --------------------Таблицы свойств--------------------<<<
const Color = sequalize.define('color', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

const Size = sequalize.define('size', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

const Variety = sequalize.define('variety', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

const Light = sequalize.define('light', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

const Material = sequalize.define('material', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

const Benefit = sequalize.define('benefit', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})
// --------------------Таблицы свойств-------------------->>>

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.hasMany(CartProduct);
CartProduct.belongsTo(Cart);

Product.hasMany(CartProduct);
CartProduct.belongsTo(Product);

Product.hasMany(ProductInfo);
ProductInfo.belongsTo(Product);

Product.hasMany(ProductDropdownInfo);
ProductDropdownInfo.belongsTo(Product);

Type.hasMany(Product);
Product.belongsTo(Type);

Type.belongsToMany(Color, {through: TypeColor});
Color.belongsToMany(Type, {through: TypeColor});

Type.belongsToMany(Size, {through: TypeSize});
Size.belongsToMany(Type, {through: TypeSize});

Type.belongsToMany(Variety, {through: TypeVariety});
Variety.belongsToMany(Type, {through: TypeVariety});

Type.belongsToMany(Light, {through: TypeLight});
Light.belongsToMany(Type, {through: TypeLight});

Type.belongsToMany(Material, {through: TypeMaterial});
Material.belongsToMany(Type, {through: TypeMaterial});

Type.belongsToMany(Benefit, {through: TypeBenefit});
Benefit.belongsToMany(Type, {through: TypeBenefit});

Color.hasMany(Product);
Size.hasMany(Product);
Variety.hasMany(Product);
Light.hasMany(Product);
Material.hasMany(Product);
Benefit.hasMany(Product);

module.exports = {
    User,
    Cart,
    CartProduct,
    Product,
    ProductInfo,
    ProductDropdownInfo,
    Type,
    Color, TypeColor,
    Size, TypeSize,
    Variety, TypeVariety,
    Light, TypeLight,
    Material, TypeMaterial,
    Benefit, TypeBenefit
}

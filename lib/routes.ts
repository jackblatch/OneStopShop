export const routes = {
  signIn: "/auth/sign-in",
  signUp: "/auth/sign-up",
  account: "/account",
  products: "/products",
  product: "/product",
  productQuickView: "/quickview/product",
  seller: "/seller",
  cart: "/cart",
  checkout: "/checkout",
  orderConfirmation: "order-confirmation",
};

export const anchorTags = {
  collectionHeader: "collection-header",
};

export const productsQueryParams = {
  seller: "seller=",
};

export const singleLevelNestedRoutes = {
  account: {
    profile: routes.account + "/selling/profile",
    products: routes.account + "/selling/products",
    orders: routes.account + "/selling/orders",
    "abandoned-carts": routes.account + "/selling/abandoned-carts",
    payments: routes.account + "/selling/payments",
    "your-purchases": routes.account + "/buying/purchases",
  },
};

const baseAccountProductRoute = singleLevelNestedRoutes.account.products.slice(
  0,
  -1
);

const baseAccountOrderRoute = singleLevelNestedRoutes.account.orders.slice(
  0,
  -1
);

export const secondLevelNestedRoutes = {
  product: {
    base: baseAccountProductRoute,
    new: baseAccountProductRoute + "/new",
  },
  order: {
    base: baseAccountOrderRoute,
  },
};

export const apiRoutes = {
  store: "/api/store",
  product: "/api/product",
};

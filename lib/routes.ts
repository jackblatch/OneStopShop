export const routes = {
  signIn: "/auth/sign-in",
  signUp: "/auth/sign-up",
  account: "/account",
  products: "/products",
  product: "/product",
  productQuickView: "/quickview/product",
  seller: "/seller",
  cart: "/cart",
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
    "your-purchases": routes.account + "/buying/purchases",
  },
};

const baseAccountProductRoute = singleLevelNestedRoutes.account.products.slice(
  0,
  -1
);

export const secondLevelNestedRoutes = {
  product: {
    base: baseAccountProductRoute,
    new: baseAccountProductRoute + "/new",
  },
};

export const apiRoutes = {
  store: "/api/store",
  product: "/api/product",
};

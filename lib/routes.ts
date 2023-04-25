export const routes = {
  signIn: "/auth/sign-in",
  signUp: "/auth/sign-up",
  account: "/account",
};

export const singleLevelNestedRoutes = {
  account: {
    profile: routes.account + "/selling/profile",
    products: routes.account + "/selling/products",
    orders: routes.account + "/selling/orders",
    "your-purchases": routes.account + "/buying/purchases",
  },
};

const baseProductRoute = singleLevelNestedRoutes.account.products.slice(0, -1);

export const secondLevelNestedRoutes = {
  product: {
    base: baseProductRoute,
    new: baseProductRoute + "/new",
  },
};

export const apiRoutes = {
  store: "/api/store",
  product: "/api/product",
};

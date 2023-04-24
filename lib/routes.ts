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

export const apiRoutes = {
  createStore: "/api/store/create-store",
  updateStoreDetails: "/api/store/update-details",
};

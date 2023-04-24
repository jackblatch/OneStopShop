export const routes = {
  signIn: "/auth/sign-in",
  signUp: "/auth/sign-up",
  account: "/account",
};

export const singleLevelNestedRoutes = {
  account: {
    "selling-profile": routes.account + "/seller/selling-profile",
    products: routes.account + "/seller/products",
    orders: routes.account + "/seller/orders",
    "your-purchases": routes.account + "/buyer/purchases",
  },
};

export const apiRoutes = {
  createStore: "/api/store/create-store",
  updateStoreDetails: "/api/store/update-details",
};

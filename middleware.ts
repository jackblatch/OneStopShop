import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/collection(.*)",
    "/product(.*)",
    "/quickview(.*)",
    "/seller(.*)",
    "/products(.*)",
    "/auth(.*)",
  ],
});
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)"],
};

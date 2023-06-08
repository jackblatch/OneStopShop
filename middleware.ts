import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/collection(.*)",
    "/product(.*)",
    "/quickview(.*)",
    "/cart(.*)",
    "/products(.*)",
    "/auth(.*)",
    "/checkout(.*)",
    "/api/stripe/(.*)",
    "/api/uploadthing",
  ],
});
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)"],
};

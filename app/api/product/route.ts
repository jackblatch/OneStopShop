import { createProduct } from "@/server-actions/products";
import { NextResponse } from "next/server";

// this api function exists to wrap the server action so it can be called from client components due to this requirement from Clerk.
// the parallel/intercepted route page is a client component, so it can't call server actions directly and therefore needs this
export async function POST(request: Request) {
  const body = await request.json();
  console.log("body", body);
  const response = await createProduct(body);
  return NextResponse.json(response);
}

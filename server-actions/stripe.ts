"use server";
import { db } from "@/db/db";
import { payments } from "@/db/schema";
import { singleLevelNestedRoutes } from "@/lib/routes";
import { currentUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import stripeDetails from "stripe";
import { getStoreId } from "./storeid";

export async function hasValidStripeAccount() {
  const user = await currentUser();
  const payment = await db
    .select()
    .from(payments)
    .where(eq(payments.storeId, Number(user?.privateMetadata.storeId)));

  return payment.length ? payment[0]?.details_submitted : false;
}

export async function createConnectedAccount() {
  try {
    // @ts-ignore
    const stripe = stripeDetails(process.env.STRIPE_SECRET_KEY);
    const account = await stripe.accounts.create({
      type: "standard",
    });

    console.log(account);

    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url:
        process.env.NEXT_PUBLIC_APP_URL +
        singleLevelNestedRoutes.account.payments,
      return_url:
        process.env.NEXT_PUBLIC_APP_URL +
        singleLevelNestedRoutes.account.payments,
      type: "account_onboarding",
    });

    return accountLink.url;
  } catch (err) {
    console.log("Error", err);
  }

  //   console.log({ accountLink });
  // save account id in database

  //   return account;
}

// change function name to be more descriptive
export async function getStripeAccount() {
  try {
    const storeIdFromDB = await getStoreId();
    const storeId = Number(storeIdFromDB);

    if (isNaN(storeId)) {
      throw new Error("Store ID not found");
    }

    const payment = await db
      .select()
      .from(payments)
      .where(eq(payments.storeId, storeId));

    // @ts-ignore
    const stripe = stripeDetails(process.env.STRIPE_SECRET_KEY);
    const account = await stripe.accounts.retrieve(payment[0].stripeAccountId);

    // checks if stripe account has been successfully created. If so, updates database with status.
    if (account.details_submitted) {
      await db.update(payments).set({
        stripeAccountCreatedAt: account.created,
      });
    }

    // return something here
  } catch (err) {
    console.log("Error", err);
    return false;
  }
}

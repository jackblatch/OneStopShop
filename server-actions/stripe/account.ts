"use server";
import { db } from "@/db/db";
import { payments } from "@/db/schema";
import { singleLevelNestedRoutes } from "@/lib/routes";
import { eq } from "drizzle-orm";
import Stripe from "stripe";
import { getStoreId } from "../store-details";
import { StripeAccount } from "@/lib/types";

export async function hasConnectedStripeAccount(
  providedStoreId?: number,
  useProvidedStoreId?: boolean
) {
  if (useProvidedStoreId && !providedStoreId) return;

  try {
    const storeId =
      useProvidedStoreId && providedStoreId
        ? providedStoreId
        : Number(await getStoreId());

    if (isNaN(storeId)) return;

    const payment = await db
      .select()
      .from(payments)
      .where(eq(payments.storeId, storeId));

    return payment.length ? payment[0]?.details_submitted : false;
  } catch (err) {
    console.log("Payment status header", err);
    return false;
  }
}

export async function createAccountLink() {
  try {
    if (await hasConnectedStripeAccount()) {
      throw new Error("Stripe account already exists");
    }
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2022-11-15",
    });

    const storeId = Number(await getStoreId());

    if (isNaN(storeId)) {
      throw new Error("Store ID not found");
    }

    const paymentRecord = await db
      .select()
      .from(payments)
      .where(eq(payments.storeId, storeId));

    let stripeAccountId;
    // check if paymentRecord exists in db with stripeAccountId
    if (paymentRecord.length && paymentRecord[0].stripeAccountId) {
      stripeAccountId = paymentRecord[0].stripeAccountId;
      // otherwise, create new stripeAccountId
    } else {
      const { id } = await stripe.accounts.create({
        type: "standard",
      });
      // Stripe api failed, throw error
      if (!id) throw new Error("Stripe account not created");
      // if paymentRecord exists, update stripeAccountId to valid one
      if (paymentRecord.length) {
        await db
          .update(payments)
          .set({
            stripeAccountId: id,
          })
          .where(eq(payments.storeId, storeId));
        // otherwise, insert new record into DB
      } else {
        await db.insert(payments).values({
          storeId,
          stripeAccountId: id,
        });
      }
      stripeAccountId = id;
    }

    const accountLink = await stripe.accountLinks.create({
      account: stripeAccountId,
      refresh_url:
        process.env.NEXT_PUBLIC_APP_URL +
        singleLevelNestedRoutes.account.payments,
      return_url:
        process.env.NEXT_PUBLIC_APP_URL +
        singleLevelNestedRoutes.account.payments,
      type: "account_onboarding",
    });

    console.log({ accountLink });

    return accountLink.url;
  } catch (err) {
    console.log("Error", err);
  }
}

export async function getStripeAccountDetails(storeId: number) {
  try {
    const payment = await db
      .select()
      .from(payments)
      .where(eq(payments.storeId, storeId));

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2022-11-15",
    });

    if (!payment[0].stripeAccountId)
      throw new Error("Stripe account not found");

    const account = await stripe.accounts.retrieve(payment[0].stripeAccountId);
    return account as StripeAccount;
  } catch (err) {
    console.log("Error", err);
  }
}

// change function name to be more descriptive
export async function updateStripeAccountStatus() {
  try {
    const storeId = Number(await getStoreId());

    if (isNaN(storeId)) {
      throw new Error("Store ID not found");
    }

    const account = await getStripeAccountDetails(storeId);

    // checks if stripe account has been successfully created. If so, updates database with status.
    if (account?.details_submitted) {
      await db
        .update(payments)
        .set({
          details_submitted: account.details_submitted,
          stripeAccountCreatedAt: account.created,
        })
        .where(eq(payments.storeId, storeId));
    }

    return account?.details_submitted ?? false;
  } catch (err) {
    console.log("Error", err);
    return false;
  }
}

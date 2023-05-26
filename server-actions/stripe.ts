"use server";
import { singleLevelNestedRoutes } from "@/lib/routes";
import stripeDetails from "stripe";

export async function createConnectedAccount() {
  // @ts-ignore
  const stripe = stripeDetails(process.env.STRIPE_SECRET_KEY);
  try {
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

    console.log({ accountLink });
    return accountLink.url;
  } catch (err) {
    console.log("Error", err);
  }

  //   console.log({ accountLink });
  // save account id in database

  //   return account;
}

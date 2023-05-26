"use server";
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
      refresh_url: "https://example.com/reauth",
      return_url: "https://example.com/return",
      type: "account_onboarding",
    });

    console.log({ accountLink });
  } catch (err) {
    console.log("Error", err);
  }

  //   console.log({ accountLink });
  // save account id in database

  //   return account;
}

"use server";

export async function createConnectedAccount() {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  const account = await stripe.accounts.create({
    type: "standard",
  });

  console.log(account);

  //   const accountLink = await stripe.accountLinks.create({
  //     account: "{{CONNECTED_ACCOUNT_ID}}",
  //     refresh_url: "https://example.com/reauth",
  //     return_url: "https://example.com/return",
  //     type: "account_onboarding",
  //   });

  // save account id in database

  return account;
}

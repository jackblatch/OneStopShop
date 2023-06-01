export default function OrderConfirmation() {
  return (
    <div>Confirmation</div>
    /*
    // mark cart as completed when successful - get cart id from cookies, mark as completed and then remove cookie.
        1. when successful order is placed, payment id is shown in URL
        --- some sort of auth needs to happen here
        2. retrieve payment details from stripe API by using oaymentIntentId exposed
        3. if payment is successful, show order confirmation page, otherwise show stripe status and revert back to checkout page
        -- is there somesort of delay here that we need to account for or does tripe process it immediately?
        */
  );
}

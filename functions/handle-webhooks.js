import getUserId from './getUserId';
import stripe from './stripe';

// serverless function that stripe will execute when user updates plan
export const handler = async ({ body, headers }, context) => {
  try {
    // Event created when user interacts with subscription
    const stripeEvent = stripe.webhooks.constructEvent(
      body,
      headers['stripe-signature'],
      process.env.STRIPE_WEBHOOK_SECRET
    );
    // Event types are list at: https://docs.stripe.com/customer-management/integrate-customer-portal#webhooks
    if (stripeEvent.type === 'customer.subscription.updated') {
      const subscription = stripeEvent.data.object;
      const plan = subscription.items.data[0].plan.nickname;
      const role = `sub:${plan.split(' ')[0].toLocaleLowerCase()}`;
      const stripeID = subscription.customer;
      const { netlifyID } = await getUserId('stripeID', stripeID);
      //   access token and netlify url to update roles
      const { identity } = context.clientContext;

      const response = await fetch(`${identity.url}/admin/users/${netlifyID}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${identity.token}` },
        body: JSON.stringify({ app_metadata: { roles: [role] } }),
      });
    }
    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    };
  } catch (error) {
    console.error(error);
  }
};
import stripe from './stripe';
import getUserId from './getUserId';

// serverless function that creates a stripe customer portal link
export const handler = async function (_event, context) {
  //   User info comes from netlify identity
  const { user } = context.clientContext;
  // Get stripe ID
  const { stripeID } = await getUserId('netlifyID', user.sub);

  // Create Stripe portal link
  const link = await stripe.billingPortal.sessions.create({
    customer: stripeID,
    return_url: process.env.URL,
  });

  return {
    statusCode: 200,
    body: JSON.stringify(link.url),
  };
};
import stripe from './stripe';
import getUserId from './getUserId';

// serverless function that creates a stripe customer portal link
export const handler = async function (_event, context) {
  try {
    //   User info comes from netlify identity
    const { user } = context.clientContext;
    // Get stripe ID
    const { stripeID } = await getUserId('netlifyID', user.sub);

    // Create Stripe portal link
    const link = await stripe.billingPortal.sessions.create({
      customer: stripeID,
      return_url: process.env.URL,
    });

    console.log('SERVER SIDE', link.url);
    if (!link) {
      throw new Error('Something when wrong');
    }

    return {
      statusCode: 200,
      body: JSON.stringify(link.url),
    };
  } catch (error) {
    console.error(error);
  }
};

import stripe from './stripe';
import supabase from './supabase';

// serverless function create a stripe customer portal link
export const handler = async function (_event, context) {
  //   User info comes from netlify identity
  const { user } = context.clientContext;
  console.log('USER', user);
  // Get stripeID
  const { data, error } = await supabase
    .from('User')
    .select('netlifyID, stripeID')
    .eq('netlifyID', user.sub)
    .single();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  const { stripeID } = data;

  const link = await stripe.billingPortal.sessions.create({
    customer: stripeID,
    return_url: process.env.URL,
  });

  return {
    statusCode: 200,
    body: JSON.stringify(link.url),
  };
};

// import stripe from './stripe';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const supabaseUrl = 'https://rvfqcjgttkcybnhkemjv.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
// import getUserId from './getUserId';

// serverless function that creates a stripe customer portal link
export const handler = async function (_event, context) {
  try {
    //   User info comes from netlify identity
    const { user } = context.clientContext;
    // Get stripe ID
    // const { stripeID } = await getUserId('netlifyID', user.sub);

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

async function getUserId(matchValue, userId) {
  return data;
}

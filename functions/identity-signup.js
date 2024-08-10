import { createClient } from '@supabase/supabase-js';
import stripe from './stripe';
// import Stripe from 'stripe';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// SUPABASE CONNECTION
const supabaseUrl = 'https://rvfqcjgttkcybnhkemjv.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Signup serverless function called by Netlify when log in button is clicked
export const handler = async function (event) {
  // Netlify identity user
  const { user } = JSON.parse(event.body);
  // Stripe created user
  const customer = await stripe.customers.create({ email: user.email });
  // signs up new customer with the free subscription
  await stripe.subscriptions.create({
    customer: customer.id,
    items: [
      {
        price: 'price_1PlvkMB7VKHUT2sFjIkIUPlR',
      },
    ],
  });
  // User IDs
  const netlifyID = user.id;
  const stripeID = customer.id;

  console.log('USER', JSON.stringify(user, null, 2));

  // TODO create a customer record in supabase with customer's Netlify and Stripe ID
  await supabase.from('User').insert([{ netlifyID, stripeID }]);

  // sub:free -- subscription type is free
  return {
    statusCode: 200,
    body: JSON.stringify({ app_metadata: { roles: ['sub:free'] } }),
  };
};

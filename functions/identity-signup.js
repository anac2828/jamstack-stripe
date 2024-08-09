import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://rvfqcjgttkcybnhkemjv.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2ZnFjamd0dGtjeWJuaGtlbWp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMxNTQxNDcsImV4cCI6MjAzODczMDE0N30.ebBOSQruOMr13e0H0j2x0GUUgd5txbRF4-gBTMIxwdw';
const supabase = createClient(supabaseUrl, supabaseKey);

// This is serverless function that lets you communication with the funa database

export const handler = async function (event) {
  const { user } = JSON.parse(event.body);
  console.log('USER', JSON.stringify(user, null, 2));

  const netlifyID = user.id;
  // const stripeID = 2;

  // TODO create a customer record in supabase
  // Insert a row
  const { data, error } = await supabase.from('User').insert([{ netlifyID }]);

  // Did it work?
  console.log('SUPABASE', data, error);

  // sub:free -- subscription type is free
  return {
    statusCode: 200,
    body: JSON.stringify({ app_metadata: { roles: ['sub:free'] } }),
  };
};

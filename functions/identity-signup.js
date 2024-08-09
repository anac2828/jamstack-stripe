import supabase from './supabase';

// This is serverless function that lets you communication with the funa database

exports.handler = async function (event) {
  const user = JSON.parse(event.body);
  console.log('USER', JSON.stringify(user, null, 2));

  const netlifyID = user.id;
  const stripeID = 1;

  // TODO create a customer record in supabase
  // Insert a row
  const { data, error } = await supabase.from('User').insert([{ netlifyID, stripeID }]);

  // Did it work?
  console.log('SUPABSE', data, error);

  // sub:free -- subscription type is free
  return {
    statusCode: 200,
    body: JSON.stringify({ app_metadata: { roles: ['sub:free'] } }),
  };
};

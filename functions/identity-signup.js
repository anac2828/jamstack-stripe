// This is serverless function that lets you communication with the funa database

exports.handler = async function (e) {
  console.log(JSON.stringify(args, null, 2));
  // sub:free -- subscription type is free
  return JSON.stringify({ app_metadata: { roles: ['sub:free'] } });
};

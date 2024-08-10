// user comes from netlify identity
async function initUserInfo(user) {
  if (!user) {
    user = 'NO USER LOGGED IN';
    document.querySelector('pre').innerText = user;
    return;
  }
  const { roles } = user.app_metadata;

  const token = await window.netlifyIdentity.currentUser().jwt(true);
  // DISPLAY ROLES
  document.querySelector('pre').innerText = JSON.stringify(roles, null, 2);

  // BUTTON TO GO TO STRIPE PORTAL
  document.querySelector('#manage-sub').addEventListener('click', () => {
    gotToStripePortal(token);
  });
}

async function gotToStripePortal(token) {
  try {
    // Makes fetch request to get the netlifyID and stripeID from supabase
    const res = await fetch('/.netlify/functions/create-manage-link', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });

    const link = await res.json();
    window.location.href = link;
  } catch (error) {
    console.log('ERROR', error);
  }
}

window.netlifyIdentity.on('init', initUserInfo);

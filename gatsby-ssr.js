import { IdentityContextProvider } from 'react-netlify-identity-widget';

export function wrapRootElement(element) {
  return <IdentityContextProvider>{element}</IdentityContextProvider>;
}

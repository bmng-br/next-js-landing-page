import { currentUser } from '@clerk/nextjs/server';
import { Env } from './Env';

/**
 * Checks whether the signed-in user may use the dashboard.
 * The dashboard shows contact form leads (personal data), so being signed in is not enough:
 * the user's primary email must be listed in `DASHBOARD_ALLOWED_EMAILS`.
 * @returns True when the user's primary email is on the allowlist.
 */
export const isDashboardAllowed = async () => {
  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress.toLowerCase();

  if (!email) {
    return false;
  }

  const allowed = (Env.DASHBOARD_ALLOWED_EMAILS ?? '')
    .split(',')
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);

  return allowed.includes(email);
};

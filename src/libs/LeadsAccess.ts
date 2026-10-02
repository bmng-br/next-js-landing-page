import { currentUser } from '@clerk/nextjs/server';
import { Env } from './Env';

/**
 * Checks whether the signed-in user may view contact form leads.
 * Leads hold personal data, so access is limited to the emails in `LEADS_VIEWER_EMAILS`.
 * @returns True when the user's primary email is on the allowlist.
 */
export const canViewLeads = async () => {
  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress.toLowerCase();

  if (!email) {
    return false;
  }

  const allowed = (Env.LEADS_VIEWER_EMAILS ?? '')
    .split(',')
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);

  return allowed.includes(email);
};

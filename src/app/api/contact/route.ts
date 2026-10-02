import { NextResponse } from 'next/server';
import * as z from 'zod';
import { notifyNewLead, saveLead } from '@/libs/Leads';
import { logger } from '@/libs/Logger';
import { ContactValidation } from '@/validations/ContactValidation';

export const POST = async (request: Request) => {
  const json = await request.json();
  const parse = ContactValidation.safeParse(json);

  if (!parse.success) {
    return NextResponse.json(z.treeifyError(parse.error), { status: 422 });
  }

  const lead = parse.data;

  // Save and alert independently, so a failure in one still leaves a trace of the lead
  const saved = await saveLead(lead).then(
    () => true,
    (error: unknown) => {
      logger.error(`Failed to save lead: ${String(error)}`);
      return false;
    },
  );

  const notified = await notifyNewLead({ lead, saved }).catch((error: unknown) => {
    logger.error(`Failed to send lead notification: ${String(error)}`);
    return false;
  });

  if (!saved && !notified) {
    return NextResponse.json({ received: false }, { status: 503 });
  }

  logger.info(`Lead received (saved: ${saved}, notified: ${notified})`);

  return NextResponse.json({ received: true });
};

import { NextResponse } from 'next/server';
import * as z from 'zod';
import { logger } from '@/libs/Logger';
import { ContactValidation } from '@/validations/ContactValidation';

export const POST = async (request: Request) => {
  const json = await request.json();
  const parse = ContactValidation.safeParse(json);

  if (!parse.success) {
    return NextResponse.json(z.treeifyError(parse.error), { status: 422 });
  }

  // TODO: Forward the request to the team (email or CRM) once the backend is defined
  logger.info(`Contact request received for the "${parse.data.moment}" moment`);

  return NextResponse.json({ received: true });
};

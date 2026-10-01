'use client';

import { createContext, use, useState } from 'react';
import type { ContactMoment } from '@/validations/ContactValidation';

type SetContactMoment = (moment: ContactMoment | undefined) => void;

const MomentContext = createContext<ContactMoment | undefined>(undefined);

const SetMomentContext = createContext<SetContactMoment | null>(null);

/**
 * Shares the project moment between the triage section and the contact form.
 * @param props The component props.
 * @param props.children The sections that read or update the moment.
 * @returns The provider wrapping the children.
 */
export const ContactMomentProvider = (props: { children: React.ReactNode }) => {
  const [moment, setMoment] = useState<ContactMoment>();

  return (
    <MomentContext value={moment}>
      <SetMomentContext value={setMoment}>{props.children}</SetMomentContext>
    </MomentContext>
  );
};

/**
 * Reads the project moment chosen for the contact form and its setter.
 * @returns The current moment and the function to change it.
 * @throws {Error} When used outside of `ContactMomentProvider`.
 */
export const useContactMoment = () => {
  const moment = use(MomentContext);
  const setMoment = use(SetMomentContext);

  if (!setMoment) {
    throw new Error('useContactMoment must be used within ContactMomentProvider');
  }

  return { moment, setMoment };
};

'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { CONTACT_MOMENTS, ContactValidation } from '@/validations/ContactValidation';
import { useContactMoment } from './ContactMomentContext';

type Status = 'idle' | 'submitting' | 'success' | 'error';

type RequiredField = 'name' | 'company' | 'email' | 'moment';

const REQUIRED_FIELDS: RequiredField[] = ['name', 'company', 'email', 'moment'];

/** Gives up on a request that never answers, so the form can offer the email fallback. */
const SUBMIT_TIMEOUT_MS = 15_000;

const fieldClassName =
  'min-h-[50px] rounded-[10px] border-[1.5px] bg-white px-4 font-sans text-base font-normal text-graphite-950 aria-invalid:border-pink';

const labelClassName = 'flex flex-col gap-2 text-[13px] font-bold';

/**
 * Lists the required fields that failed validation, in form order.
 * @param data The raw form values.
 * @returns The invalid fields, or the parsed request when everything is valid.
 */
const validate = (data: Record<string, unknown>) => {
  const parse = ContactValidation.safeParse(data);

  if (parse.success) {
    return { request: parse.data, invalidFields: [] };
  }

  const issuePaths = new Set(parse.error.issues.map((issue) => issue.path[0]));

  return {
    request: undefined,
    invalidFields: REQUIRED_FIELDS.filter((field) => issuePaths.has(field)),
  };
};

const FieldError = (props: { id: string; show: boolean; children: React.ReactNode }) =>
  props.show && (
    <span id={props.id} className="text-[13px] leading-5 font-semibold text-pink-deep">
      {props.children}
    </span>
  );

export const ContactForm = (props: { email: string }) => {
  const t = useTranslations('ContactForm');
  const locale = useLocale();
  const contactMoment = useContactMoment();
  const [status, setStatus] = useState<Status>('idle');
  const [invalidFields, setInvalidFields] = useState<RequiredField[]>([]);

  if (status === 'success') {
    return (
      <output
        ref={(node) => node?.focus()}
        tabIndex={-1}
        className="flex animate-fade-in flex-col gap-3.5 rounded-2xl bg-white px-9 py-16 text-graphite-950 outline-none"
      >
        <div className="size-4 rounded-full bg-pink" />
        <div className="text-[28px] leading-[34px] font-bold tracking-[-0.03em]">
          {t('success_title')}
        </div>
        <p className="m-0 text-base leading-[26px] text-graphite-700">{t('success_body')}</p>
        <button
          type="button"
          onClick={() => {
            setStatus('idle');
          }}
          className="min-h-11 cursor-pointer self-start border-0 bg-transparent p-0 text-[15px] font-bold text-teal underline hover:text-graphite-950"
        >
          {t('reset_button')}
        </button>
      </output>
    );
  }

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const result = validate(Object.fromEntries(new FormData(form)));
    setInvalidFields(result.invalidFields);

    if (!result.request) {
      const firstInvalid = form.elements.namedItem(result.invalidFields[0] ?? '');

      if (firstInvalid instanceof HTMLElement) {
        firstInvalid.focus();
      }

      return;
    }

    setStatus('submitting');

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...result.request, locale }),
      signal: AbortSignal.timeout(SUBMIT_TIMEOUT_MS),
    }).catch(() => null);

    setStatus(response?.ok ? 'success' : 'error');
  };

  // A moment picked in the triage section above clears the form's moment error too
  const isInvalid = (field: RequiredField) =>
    invalidFields.includes(field) && !(field === 'moment' && contactMoment.moment);

  // Flags a filled field as soon as it loses focus; empty ones are only flagged on submit
  const validateOnBlur =
    (field: 'name' | 'company' | 'email') => (event: React.FocusEvent<HTMLInputElement>) => {
      const { value } = event.currentTarget;

      if (value === '') {
        return;
      }

      const isValid = ContactValidation.shape[field].safeParse(value).success;

      setInvalidFields((current) => {
        const others = current.filter((elt) => elt !== field);

        return isValid ? others : [...others, field];
      });
    };

  const errorProps = (field: RequiredField) => ({
    name: field,
    'aria-invalid': isInvalid(field),
    'aria-describedby': isInvalid(field) ? `contact-${field}-error` : undefined,
  });

  const inputProps = (field: 'name' | 'company' | 'email') => ({
    ...errorProps(field),
    onBlur: validateOnBlur(field),
    maxLength: field === 'email' ? 320 : 200,
  });

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="flex flex-col gap-[18px] rounded-2xl bg-white px-9 py-10 text-graphite-950"
    >
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-[18px]">
        <label className={labelClassName}>
          {t('name_label')}
          <input
            type="text"
            autoComplete="name"
            required
            className={`${fieldClassName} border-graphite-500`}
            {...inputProps('name')}
          />
          <FieldError id="contact-name-error" show={isInvalid('name')}>
            {t('name_error')}
          </FieldError>
        </label>
        <label className={labelClassName}>
          {t('company_label')}
          <input
            type="text"
            autoComplete="organization"
            required
            className={`${fieldClassName} border-graphite-500`}
            {...inputProps('company')}
          />
          <FieldError id="contact-company-error" show={isInvalid('company')}>
            {t('company_error')}
          </FieldError>
        </label>
      </div>
      <label className={labelClassName}>
        {t('email_label')}
        <input
          type="email"
          autoComplete="email"
          required
          className={`${fieldClassName} border-graphite-500`}
          {...inputProps('email')}
        />
        <FieldError id="contact-email-error" show={isInvalid('email')}>
          {t('email_error')}
        </FieldError>
      </label>
      <label className={labelClassName}>
        {t('moment_label')}
        <select
          required
          value={contactMoment.moment ?? ''}
          onChange={(event) => {
            contactMoment.setMoment(CONTACT_MOMENTS.find((elt) => elt === event.target.value));
          }}
          className={`${fieldClassName} border-graphite-500 px-3.5`}
          {...errorProps('moment')}
        >
          <option value="" disabled>
            {t('moment_placeholder')}
          </option>
          {CONTACT_MOMENTS.map((moment) => (
            <option key={moment} value={moment}>
              {t(`moment_${moment}`)}
            </option>
          ))}
        </select>
        <FieldError id="contact-moment-error" show={isInvalid('moment')}>
          {t('moment_error')}
        </FieldError>
      </label>
      <label className={labelClassName}>
        {t('message_label')}
        <textarea
          name="message"
          placeholder={t('message_placeholder')}
          maxLength={5000}
          rows={3}
          className={`${fieldClassName} resize-y border-graphite-500 py-3.5 leading-6`}
        />
      </label>
      {status === 'error' && (
        <div
          role="alert"
          className="rounded-[10px] border-[1.5px] border-pink px-4 py-3 text-sm leading-[21px] font-semibold"
        >
          {t.rich('submit_error', {
            email: props.email,
            mail: (chunks) => (
              <a href={`mailto:${props.email}`} className="underline">
                {chunks}
              </a>
            ),
          })}
        </div>
      )}
      <div className="text-sm leading-[21px] font-semibold">{t('reply_note')}</div>
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="min-h-[54px] cursor-pointer rounded-[10px] border-0 bg-pink px-6 text-base font-bold text-graphite-950 transition-colors duration-200 hover:bg-pink-soft disabled:cursor-wait disabled:opacity-70"
      >
        {status === 'submitting' ? t('submitting_button') : t('submit_button')}
      </button>
      <div className="text-sm leading-[21px] text-graphite-700">{t('privacy_note')}</div>
    </form>
  );
};

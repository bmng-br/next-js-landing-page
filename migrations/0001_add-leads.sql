CREATE TABLE "leads" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"company" text,
	"email" text NOT NULL,
	"moment" text NOT NULL,
	"message" text,
	"locale" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);

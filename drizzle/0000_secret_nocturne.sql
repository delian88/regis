CREATE TABLE "admin_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"full_name" text DEFAULT 'Super Administrator' NOT NULL,
	"role" text DEFAULT 'superadmin' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "admin_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "agents" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"company_name" text NOT NULL,
	"slug" text NOT NULL,
	"logo_url" text,
	"phone" text NOT NULL,
	"whatsapp" text NOT NULL,
	"email" text,
	"location" text NOT NULL,
	"is_verified" boolean DEFAULT true NOT NULL,
	"agent_type" text DEFAULT 'agent' NOT NULL,
	"active_listings_count" integer DEFAULT 1,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "agents_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "favorites" (
	"id" serial PRIMARY KEY NOT NULL,
	"property_id" integer NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "inspection_bookings" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"property_interest" text,
	"preferred_date" text,
	"message" text,
	"status" text DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "properties" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"description" text NOT NULL,
	"category" text NOT NULL,
	"property_type" text NOT NULL,
	"subtype" text NOT NULL,
	"price" double precision NOT NULL,
	"currency" text DEFAULT 'NGN' NOT NULL,
	"period" text,
	"state" text NOT NULL,
	"locality" text NOT NULL,
	"area" text,
	"street_address" text,
	"bedrooms" integer DEFAULT 0,
	"bathrooms" integer DEFAULT 0,
	"toilets" integer DEFAULT 0,
	"parking_spaces" integer DEFAULT 0,
	"plot_size_sqm" double precision,
	"is_furnished" boolean DEFAULT false NOT NULL,
	"is_serviced" boolean DEFAULT false NOT NULL,
	"is_shared" boolean DEFAULT false NOT NULL,
	"is_featured" boolean DEFAULT false NOT NULL,
	"is_verified" boolean DEFAULT true NOT NULL,
	"status" text DEFAULT 'available' NOT NULL,
	"images" json DEFAULT '[]'::json NOT NULL,
	"video_url" text,
	"videos" json DEFAULT '[]'::json NOT NULL,
	"amenities" json DEFAULT '[]'::json NOT NULL,
	"agent_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "properties_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "property_requests" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"request_type" text NOT NULL,
	"property_type" text NOT NULL,
	"state" text NOT NULL,
	"locality" text,
	"bedrooms" integer,
	"budget_min" double precision,
	"budget_max" double precision,
	"details" text,
	"status" text DEFAULT 'active' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "site_content" (
	"id" text PRIMARY KEY NOT NULL,
	"section" text NOT NULL,
	"data" json NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_property_id_properties_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "properties" ADD CONSTRAINT "properties_agent_id_agents_id_fk" FOREIGN KEY ("agent_id") REFERENCES "public"."agents"("id") ON DELETE no action ON UPDATE no action;
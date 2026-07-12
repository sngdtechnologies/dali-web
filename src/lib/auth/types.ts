// Seam for the backoffice (spec 2). Admin auth is NestJS-native (email+password -> JWT),
// held in an httpOnly cookie set by a Next.js BFF route handler. No Firebase in the admin path.
export type AdminSession = {
  token: string;
  admin: { id: string; email: string; name: string; role: string };
};

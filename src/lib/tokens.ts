import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "swastik-secret-key-1988";

export interface AdminPayload {
  orderId: string;
  action: "approve";
}

export interface CustomerPayload {
  orderId: string;
}

export function generateAdminToken(orderId: string): string {
  const payload: AdminPayload = { orderId, action: "approve" };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "365d" });
}

export function generateCustomerToken(orderId: string): string {
  const payload: CustomerPayload = { orderId };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "5d" });
}

export function verifyAdminToken(token: string): AdminPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminPayload;
  } catch (error) {
    console.error("Admin token verification failed:", error);
    return null;
  }
}

export function verifyCustomerToken(token: string): CustomerPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as CustomerPayload;
  } catch (error) {
    console.error("Customer token verification failed:", error);
    return null;
  }
}

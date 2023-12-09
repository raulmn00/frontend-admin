export type Student = {
  id?: string;
  createdAt?: string;
  name: string;
  email: string;
  phone: string;
  messages?: Message[];
  tickets?: Ticket[];
  credential?: Credential;
};

export type Admin = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  messages?: Message[];
  credential?: Credential;
};

export type Ticket = {
  id: string;
  createdAt: string;
  studentId: string;
  student?: Student;
  subject: string;
  type: string;
  description: string;
  status: TicketStatus;
  messages?: Message[];
};

export type Message = {
  id: string;
  createdAt: string;
  studentId: string;
  student?: Student;
  adminId: string;
  admin?: Admin;
  createdBy: Admin | Student;
  ticket: Ticket;
  content: string;
  createdByAdmin: boolean;
};

export type Credential = {
  id: string;
  createdAt: string;
  adminId?: string;
  studentId?: string;
  password: string;
  admin?: Admin;
  student?: Student;
};

export enum TicketStatus {
  open = "open",
  pending = "pending",
  closed = "closed",
}

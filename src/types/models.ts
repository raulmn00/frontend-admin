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
  status: TicketStatus.opened | null;
  messages?: Message[];
};

export type Message = {
  id: string;
  createdAt: string;
  studentId: string;
  student?: Student;
  adminId: string;
  admin?: Admin;
  createdBy: string;
  ticket: Ticket;
  content: string;
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
  opened,
  pending,
  closed,
}

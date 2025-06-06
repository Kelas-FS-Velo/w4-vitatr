export interface ILoan {
  id: number;
  book_id: number;
  user_id: number;
  loan_date: string;
  return_date: string | null;
  is_returned: boolean;
  book?: {
    title: string;
  };
  user?: {
    name: string;
  };
}

export interface ILoanPayload {
  book_id: number;
  user_id: number;
}

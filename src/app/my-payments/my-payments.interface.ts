export interface IPaymentModel {
  fullName: string;
  cardNumber: string;
  cardMonth: string;
  cardYear: string;
  cvv: string;
  zipCode: string;
}

export interface IMonth {
  text: string;
  value: string;
}

export interface IYear {
  text: string;
  value: string;
}

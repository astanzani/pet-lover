export interface Pet {
  petId: string;
  userId: string;
  name: string;
  picture?: string;
}

export type AddPetInput = Omit<Pet, 'petId' | 'userId'>;

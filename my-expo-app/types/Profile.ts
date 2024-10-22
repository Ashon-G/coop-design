export interface Profile {
  id: string;
  name: string;
  role: "founder" | "intern";
  description: string;
  skills: string[];
  interests: string[];
  experience: number;
  goals: string[];
  photoURL: string;
}

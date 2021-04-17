import { Document } from "mongoose";
export interface UserPropsModel extends Document {
  id?: string;
  firstName: string;
  password: string;
  email: string;
  clips: any[];
}

export interface ClipPropsModel extends Document {
  ownerId?: string;
  title?: string;
  description?: string;
  url?: string;
}

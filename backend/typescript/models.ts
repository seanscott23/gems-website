import { Document } from "mongoose";
export interface UserPropsModel extends Document {
  id?: string;
  firstName: string;
  profilePhoto: string;
  password: string;
  email: string;
  clips: any[];
}

export interface ClipPropsModel extends Document {
  ownerId?: string;
  id?: string;
  title?: string;
  description?: string;
  url?: string;
}

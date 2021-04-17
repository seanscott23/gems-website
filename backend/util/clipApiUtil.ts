import axios from "axios";

export const fetchUserClips = (ownerId) => {
  return axios.get(
    process.env.NODE_ENV === "production"
      ? `${process.env.NEXT_PUBLIC_DEPLOYED_HOST_SERVER}/users/${ownerId}/clips`
      : `${process.env.NEXT_PUBLIC_LOCAL_HOST_SERVER}/users/${ownerId}/clips`
  );
};

export const createClip = (clip) => {
  return axios.post(
    process.env.NODE_ENV === "production"
      ? `${process.env.NEXT_PUBLIC_DEPLOYED_HOST_SERVER}/clips`
      : `${process.env.NEXT_PUBLIC_LOCAL_HOST_SERVER}/clips`,
    clip
  );
};

export const updateClip = (clipId, data) => {
  return axios.patch(
    process.env.NODE_ENV === "production"
      ? `${process.env.NEXT_PUBLIC_DEPLOYED_HOST_SERVER}/clips/${clipId}`
      : `${process.env.NEXT_PUBLIC_LOCAL_HOST_SERVER}/clips/${clipId}`,
    data
  );
};

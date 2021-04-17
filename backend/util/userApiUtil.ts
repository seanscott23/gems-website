import axios from "axios";

export const fetchUser = async (userId) => {
  try {
    const res = await axios.get(
      process.env.NODE_ENV === "production"
        ? `${process.env.NEXT_PUBLIC_DEPLOYED_HOST_SERVER}/users/${userId}`
        : `${process.env.NEXT_PUBLIC_LOCAL_HOST_SERVER}/users/${userId}`
    );
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const fetchCurrentUser = (token) => {
  const newToken = token.split("%20").join(" ");
  return axios.get(
    process.env.NODE_ENV === "production"
      ? `${process.env.NEXT_PUBLIC_DEPLOYED_HOST_SERVER}/users/current`
      : `${process.env.NEXT_PUBLIC_LOCAL_HOST_SERVER}/users/current`,
    {
      headers: {
        Authorization: newToken,
      },
    }
  );
};

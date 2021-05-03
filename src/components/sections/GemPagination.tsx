import React from "react";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { getUserGems } from "../../store/actions/gemSubmitAction";
import GemCard from "./GemCard";

const GemPagination: FC<{
  posts: Array<any>;
}> = ({ posts }) => {
  const { userGems } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getUserGems());
  }, [userGems]);

  return (
    <div>
      {posts !== undefined
        ? posts.map((gem: any) => <GemCard gemID={gem[0]} gemInfo={gem[1]} />)
        : null}
    </div>
  );
};

export default GemPagination;

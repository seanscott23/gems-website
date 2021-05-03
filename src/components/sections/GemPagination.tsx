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
  const getIndex = (index: number) => {
    let num = userGems.length - 1;
    return num - index;
  };
  React.useEffect(() => {
    dispatch(getUserGems());
  }, [userGems]);

  return (
    <div>
      {posts !== undefined
        ? posts.map((gem: any, i: number) => (
            <GemCard gemID={gem[0]} gemInfo={gem[1]} index={getIndex(i)} />
          ))
        : null}
    </div>
  );
};

export default GemPagination;

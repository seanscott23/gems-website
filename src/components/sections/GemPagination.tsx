import { FC } from "react";

import GemCard from "./GemCard";

const GemPagination: FC<{
  posts: Array<any>;
}> = ({ posts }) => {
  return (
    <div>
      {posts !== undefined
        ? posts.map((gem: any) => <GemCard gemID={gem[0]} gemInfo={gem[1]} />)
        : null}
    </div>
  );
};

export default GemPagination;

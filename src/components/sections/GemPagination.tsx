import { FC } from "react";

import GemCard from "./GemCard";

const GemPagination: FC<{
  posts: Array<any>;
  clips: Array<any>;
  setClips: (clips: any[]) => void;
  input: string;
}> = ({ posts, clips, setClips, input }) => {
  return input === "" ? (
    <div>
      {posts !== undefined
        ? posts.map((gem: any) => <GemCard gemID={gem[0]} gemInfo={gem[1]} />)
        : null}
    </div>
  ) : (
    <div>
      {clips !== undefined
        ? clips.map((gem: any) => <GemCard gemID={gem[0]} gemInfo={gem[1]} />)
        : null}
    </div>
  );
};

export default GemPagination;

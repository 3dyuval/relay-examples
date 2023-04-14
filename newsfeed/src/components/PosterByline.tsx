import * as React from "react";
import Image from "./Image";
import type {PosterBylineFragment$key} from './__generated__/PosterBylineFragment.graphql'
import { graphql, useFragment } from "react-relay";

export type Props = {
  poster: PosterBylineFragment$key
};

const PosterBylineFragment = graphql`
  fragment PosterBylineFragment on Actor {
      name
      profilePicture {
       ...ImageFragment @arguments(width: 60, height: 60)
      }
   }
`

export default function PosterByline({ poster }: Props): React.ReactElement {

  const data = useFragment(PosterBylineFragment, poster)

  if (data == null) {
    return null;
  }
  return (
    <div className="byline">
      <Image
        image={data.profilePicture}
        className="byline__image"
        width={60}
        height={60}
      />
      <div className="byline__name">{data.name}</div>
    </div>
  );
}

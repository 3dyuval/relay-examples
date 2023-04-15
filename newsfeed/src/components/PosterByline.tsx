import * as React from "react"
import Image from "./Image"
import type { PosterBylineFragment$key } from "./__generated__/PosterBylineFragment.graphql"
import { graphql, useFragment, useQueryLoader } from "react-relay"
import Hovercard from "./Hovercard"
import { PosterDetailsHovercardContentsQuery as HovercardQueryType } from "./__generated__/PosterDetailsHovercardContentsQuery.graphql"
import PosterDetailsHovercardContents, {
  PosterDetailsHovercardContentsQuery,
} from "./PosterDetailsHovercardContents"

export type Props = {
  poster: PosterBylineFragment$key
}

const PosterBylineFragment = graphql`
  fragment PosterBylineFragment on Actor {
    id
    name
    profilePicture {
      ...ImageFragment @arguments(width: 60, height: 60)
    }
  }
`

export default function PosterByline({ poster }: Props): React.ReactElement {
  const data = useFragment(PosterBylineFragment, poster)

  const [hovercardQueryRef, loadHovercardQuery] =
    useQueryLoader<HovercardQueryType>(PosterDetailsHovercardContentsQuery)

  const hoverRef = React.useRef(null)

  function onBeginHover () {
    loadHovercardQuery({posterID: data.id})
  }
  
  if (data == null) {
    return null
  }
  return (
    <div className="byline" ref={hoverRef}>
      <Image
        image={data.profilePicture}
        className="byline__image"
        width={60}
        height={60}
      />
      <Hovercard onBeginHover={onBeginHover} targetRef={hoverRef}>
        <PosterDetailsHovercardContents queryRef={hovercardQueryRef} />
      </Hovercard>
      <div className="byline__name">{data.name}</div>
    </div>
  )
}

import * as React from "react"
import Card from "./Card"
import Heading from "./Heading"
import PosterByline, { type Props as PosterBylineProps } from "./PosterByline"
import StorySummary from "./StorySummary"
import StoryCommentsSection from './StoryCommentsSection'
import Image from "./Image"
import Timestamp from "./Timestamp"
import { graphql } from "relay-runtime"
import { useFragment } from "react-relay"
import { StoryFragment$key } from "./__generated__/StoryFragment.graphql"
type Props = {
  story: StoryFragment$key
}

const StoryFragment = graphql`
  fragment StoryFragment on Story {
    title
    summary
    createdAt
    thumbnail {
      ...ImageFragment @arguments(width: 400)
    }
    poster {
      ...PosterBylineFragment
    }
      ...StoryCommentsSectionFragment
  }
`

export default function Story({ story }: Props): React.ReactElement {
  const data = useFragment(StoryFragment, story)
  return (
    <Card>
      <PosterByline poster={data.poster} />
      <Heading>{data.title}</Heading>
      <Timestamp time={data.createdAt}></Timestamp>
      <Image image={data.thumbnail} width={400} height={400} />
      <StorySummary summary={data.summary} />
      <StoryCommentsSection story={data} />
    </Card>
  )
}

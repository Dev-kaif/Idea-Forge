import Card from "./Card"

const Cards = () => {
  return (
    <div className="mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card YoutubeSrc={"https://www.youtube.com/live/O2A4DcblBlc?si=oGFw6Ly_7FcyrtOp"}/>
        <Card YoutubeSrc={"https://youtu.be/6cXpjtc36XE?si=ahx6wOAQy2HnYNme" }/>
        <Card YoutubeSrc={"https://www.youtube.com/watch?v=iZwJNf2OVvA&ab_channel=DhruvRathee" }/>
        <Card twitterSrc={"https://x.com/kirat_tw/status/1875218603966136424" }/>
    </div>
    </div>
  )
}

export default Cards

import Card from "./Card"

const Cards = () => {
  return (
    <div className="mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card YoutubeSrc={"https://www.youtube.com/embed/O2A4DcblBlc?si=3rtYKU26CirfLIoe"}/>
        <Card twitterSrc={"https://x.com/kirat_tw/status/1875218603966136424" }/>
    </div>
    </div>
  )
}

export default Cards

import Card from "./Card"

const Cards = () => {
  return (
    <div className="mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card tags={["menss issue","watch later"] }Date={new Date().toLocaleDateString()} title="Mens Right" type="Youtube" Src="https://www.youtube.com/watch?v=iZwJNf2OVvA&ab_channel=DhruvRathee" />
      <Card discription="hello bhaiyyo behno mera name kalli me hu balli" title="Harkirat"   Date={new Date().toLocaleDateString()} type={"Twitter"} Src={"https://x.com/kirat_tw/status/1875218603966136424" }/>
    </div>
    </div>
  )
}

export default Cards

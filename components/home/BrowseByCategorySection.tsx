import VehicleCategoryRow from './VehicleCategoryRow'
import HolidaysCategoryRow from './HolidaysCategoryRow'
import StaticEnquiryRow, { StaticCategoryItem } from './StaticEnquiryRow'

const HOTEL_ITEMS: StaticCategoryItem[] = [
  {
    name: '3 Star',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: '4 Star',
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: '5 Star',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Homestay',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
  },
]

const CORPORATE_ITEMS: StaticCategoryItem[] = [
  {
    name: 'Meetings',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Incentives',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Conferences',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Exhibitions',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
  },
]

export default function BrowseByCategorySection() {
  return (
    <section className="relative overflow-hidden bg-white pb-20 pt-6 sm:pt-10 border-t border-ivory-dark">
      <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-cta/5 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-[28rem] w-[28rem] rounded-full bg-gold/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-12">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-cta">Everything in one place</p>
          <h2 className="font-display text-4xl font-bold text-ink md:text-5xl">Browse by category</h2>
        </div>

        <div className="space-y-14">
          <HolidaysCategoryRow index="01" />
          <VehicleCategoryRow index="02" title="Cabs" viewAllHref="/cabs" square/>
          {/* Van and Bus both pull the same "Van/Bus" tagged vehicles for now — the backend only
             has one combined tag. Once it can tell them apart (a dedicated tag or query param),
             point each row at its own filtered result. */}
          <VehicleCategoryRow index="03" title="Van" tagTitle="Van" viewAllHref="/cabs?type=van" square/>
          <VehicleCategoryRow index="04" title="Bus" tagTitle="Bus" viewAllHref="/cabs?type=bus" square/>
          <VehicleCategoryRow index="05" title="Luxury Cabs" tagTitle="Luxury" viewAllHref="/cabs?type=luxury" square />
          {/* Client review only: same Luxury Cabs row, 3 items filling the row. Remove after review. */}
          {/* <VehicleCategoryRow index="05" title="Luxury Cabs (3 items)" tagTitle="Luxury" viewAllHref="/cabs?type=luxury" square count={3} /> */}
          <StaticEnquiryRow index="06" title="Corporate Bookings" items={CORPORATE_ITEMS} />
          <StaticEnquiryRow id="hotel" index="07" title="Hotel" items={HOTEL_ITEMS} />
        </div>
      </div>
    </section>
  )
}

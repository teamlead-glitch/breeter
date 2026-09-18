'use client'
import { Award, Building2, Home, LayoutGrid, Presentation, Users } from 'lucide-react'
import VehicleCategoryRow from './VehicleCategoryRow'
import HolidaysCategoryRow from './HolidaysCategoryRow'
import StaticEnquiryRow, { StaticCategoryItem } from './StaticEnquiryRow'

const HOTEL_ITEMS: StaticCategoryItem[] = [
  { name: '3 Star', desc: 'Budget-friendly comfort stays', icon: Building2 },
  { name: '4 Star', desc: 'Elevated comfort & amenities', icon: Building2 },
  { name: '5 Star', desc: 'Luxury stays & fine dining', icon: Building2 },
  { name: 'Homestay', desc: 'Local charm, personal touch', icon: Home },
]

const CORPORATE_ITEMS: StaticCategoryItem[] = [
  { name: 'Meetings', desc: 'Boardrooms & business travel', icon: Users },
  { name: 'Incentives', desc: 'Reward trips for top performers', icon: Award },
  { name: 'Conferences', desc: 'Large-scale event logistics', icon: Presentation },
  { name: 'Exhibitions', desc: 'Trade shows & exhibit travel', icon: LayoutGrid },
]

export default function BrowseByCategorySection() {
  return (
    <section className="relative overflow-hidden bg-white py-20 border-t border-ivory-dark">
      <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-cta/5 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-[28rem] w-[28rem] rounded-full bg-gold/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-cta">Everything in one place</p>
          <h2 className="font-display text-4xl font-bold text-ink md:text-5xl">Browse by category</h2>
        </div>

        <div className="space-y-14">
          <VehicleCategoryRow index="01" title="Cabs" viewAllHref="/cabs" />
          <VehicleCategoryRow index="02" title="Luxury Cabs" tagTitle="Luxury" viewAllHref="/cabs?type=luxury" />
          {/* Van and Bus both pull the same "Van/Bus" tagged vehicles for now — the backend only
             has one combined tag. Once it can tell them apart (a dedicated tag or query param),
             point each row at its own filtered result. */}
          <VehicleCategoryRow index="03" title="Van" tagTitle="Van/Bus" viewAllHref="/cabs?type=bus-van" />
          <VehicleCategoryRow index="04" title="Bus" tagTitle="Van/Bus" viewAllHref="/cabs?type=bus-van" />
          <HolidaysCategoryRow index="05" />
          <StaticEnquiryRow index="06" title="Hotel" items={HOTEL_ITEMS} />
          <StaticEnquiryRow index="07" title="Corporate Bookings" items={CORPORATE_ITEMS} />
        </div>
      </div>
    </section>
  )
}

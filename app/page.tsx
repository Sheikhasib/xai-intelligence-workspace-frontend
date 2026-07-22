import { Navbar } from '@/components/ui/navbar'
import { Footer } from '@/components/ui/footer'
import { Hero } from '@/components/sections/hero/hero'
import { InsightFlow } from '@/components/sections/insight-flow/insight-flow'
import { DashboardPreview } from '@/components/sections/dashboard-preview/dashboard-preview'
import { SignatureInteraction } from '@/components/sections/signature-interaction/signature-interaction'

export default function Home() {
  return (
    <main className="bg-bg-base">
      <Navbar />
      <Hero />
      <InsightFlow />
      <DashboardPreview />
      <SignatureInteraction />
      <Footer />
    </main>
  )
}

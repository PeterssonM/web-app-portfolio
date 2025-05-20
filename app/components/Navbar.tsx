import { getOpenToWorkStatus } from '../lib/getNavbar'
import NavbarClient from './NavbarClient'

export default async function Navbar() {
  const status = await getOpenToWorkStatus()

  return (
    <section className="overflow-hidden">
      <div className="text-center">
        <NavbarClient isOpenToWork={status.isOpenToWork} />
      </div>
    </section>
  )
}
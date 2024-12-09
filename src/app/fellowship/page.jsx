import { permanentRedirect } from 'next/navigation'

export default function Page() {
    return permanentRedirect('/fellowship/dashboard')
}

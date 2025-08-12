'use client'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import Header from './header/Header'
import Footer from './footer/Footer'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

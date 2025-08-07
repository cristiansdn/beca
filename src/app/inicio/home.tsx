'use client'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function Home() {
  const { user, loading } = useAuth()

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-primary/5 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-primary/5 rounded-full blur-2xl"></div>
        
        <div className="container mx-auto px-6 py-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Hero Content */}
            <div className="space-y-10">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary/10 to-secondary/20 rounded-full text-sm font-semibold border border-primary/20 shadow-lg backdrop-blur-sm">
                <span className="mr-2">🇵🇪</span>
                Sistema Nacional de Becas
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-black leading-tight bg-gradient-to-r from-foreground via-primary to-primary bg-clip-text text-transparent">
                Accede a la información de<br/>
                <span className="text-primary drop-shadow-sm">Beca 18</span> de forma<br/>
                rápida y sencilla
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed font-medium max-w-lg">
                BecaYACHAY revoluciona el acceso a la información educativa. 
                Encuentra todo lo que necesitas sobre requisitos, cronogramas, 
                IES elegibles y criterios de puntaje en un solo lugar.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <Link 
                  href="/login"
                  className="group bg-gradient-to-r from-primary to-primary-hover text-white px-8 py-4 rounded-xl hover:shadow-2xl hover:shadow-primary/25 font-semibold inline-flex items-center justify-center transform hover:scale-105 transition-all duration-300"
                >
                  <span className="mr-2 group-hover:animate-bounce">🚀</span>
                  Explorar Requisitos
                </Link>
                <button className="bg-secondary/80 backdrop-blur-sm text-foreground px-8 py-4 rounded-xl hover:bg-secondary hover:shadow-xl font-semibold border border-primary/10 transform hover:scale-105 transition-all duration-300">
                  <span className="mr-2">📖</span>
                  Conocer Más
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-8 pt-12">
                <div className="text-center group">
                  <div className="text-4xl font-black text-primary mb-2 group-hover:scale-110 transition-transform duration-300">5</div>
                  <div className="text-sm text-muted-foreground font-medium">Secciones<br/>Optimizadas</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl font-black text-primary mb-2 group-hover:scale-110 transition-transform duration-300">85%</div>
                  <div className="text-sm text-muted-foreground font-medium">Reducción<br/>de Tiempo</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl font-black text-primary mb-2 group-hover:scale-110 transition-transform duration-300">24/7</div>
                  <div className="text-sm text-muted-foreground font-medium">Disponible<br/>Siempre</div>
                </div>
              </div>
            </div>
            
            {/* Hero Visual */}
            <div className="lg:pl-8">
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-primary/10 hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
                <div className="mb-8 pb-6 border-b border-secondary">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 bg-danger rounded-full"></div>
                    <div className="w-3 h-3 bg-warning rounded-full"></div>
                    <div className="w-3 h-3 bg-success rounded-full"></div>
                  </div>
                  <h3 className="text-2xl font-bold text-primary flex items-center gap-2">
                    🎓 BecaYACHAY
                  </h3>
                  <p className="text-muted-foreground font-medium">Etapa de Selección - Beca 18</p>
                </div>
                
                <div className="space-y-5">
                  <div className="group flex items-start gap-4 p-4 bg-gradient-to-r from-secondary/50 to-secondary/30 rounded-xl hover:from-primary/10 hover:to-secondary/40 transition-all duration-300 cursor-pointer">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <span className="text-2xl group-hover:scale-110 transition-transform duration-300">📄</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-foreground mb-1">Requisitos de Postulación</h4>
                      <p className="text-sm text-muted-foreground">5 requisitos obligatorios, 4 condicionales</p>
                    </div>
                  </div>
                  
                  <div className="group flex items-start gap-4 p-4 bg-gradient-to-r from-secondary/50 to-secondary/30 rounded-xl hover:from-primary/10 hover:to-secondary/40 transition-all duration-300 cursor-pointer">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <span className="text-2xl group-hover:scale-110 transition-transform duration-300">📋</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-foreground mb-1">Procedimiento de Postulación</h4>
                      <p className="text-sm text-muted-foreground">11 pasos claros y detallados</p>
                    </div>
                  </div>
                  
                  <div className="group flex items-start gap-4 p-4 bg-gradient-to-r from-secondary/50 to-secondary/30 rounded-xl hover:from-primary/10 hover:to-secondary/40 transition-all duration-300 cursor-pointer">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <span className="text-2xl group-hover:scale-110 transition-transform duration-300">📅</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-foreground mb-1">Cronograma</h4>
                      <p className="text-sm text-muted-foreground">Fechas clave de ambos momentos</p>
                    </div>
                  </div>
                  
                  <div className="group flex items-start gap-4 p-4 bg-gradient-to-r from-secondary/50 to-secondary/30 rounded-xl hover:from-primary/10 hover:to-secondary/40 transition-all duration-300 cursor-pointer">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <span className="text-2xl group-hover:scale-110 transition-transform duration-300">🏛️</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-foreground mb-1">IES Elegibles</h4>
                      <p className="text-sm text-muted-foreground">Filtrado por región y modalidad</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-primary/5 flex items-center justify-center relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-secondary/20 rounded-full blur-3xl"></div>
      
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-12 border border-primary/10 text-center max-w-md w-full mx-6 transform hover:scale-105 transition-all duration-300">
        <div className="w-20 h-20 bg-gradient-to-r from-primary to-primary-hover rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl text-white">🎓</span>
        </div>
        
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
          ¡Bienvenido de vuelta!
        </h1>
        
        <div className="bg-secondary/50 rounded-xl p-4 mb-6 space-y-2">
          <p className="text-sm text-muted-foreground font-medium">Email:</p>
          <p className="font-semibold text-foreground">{user.email}</p>
          <p className="text-xs text-muted-foreground mt-2">ID: {user.id.slice(0, 8)}...</p>
        </div>
        
        <div className="space-y-3">
          <Link
            href="/crud"
            className="block bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary-hover font-semibold transform hover:scale-105 transition-all duration-300"
          >
            📊 Gestión de Empleados
          </Link>
          
          <button 
            onClick={handleLogout}
            className="w-full bg-secondary text-foreground px-6 py-3 rounded-xl hover:bg-secondary-hover font-semibold transform hover:scale-105 transition-all duration-300"
          >
            <span className="mr-2">🚪</span>
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  )
}
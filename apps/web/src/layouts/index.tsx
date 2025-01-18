import Header from './components/Header'
interface IMyLayout {
  children: React.ReactElement
}

export default function Layout({ children }: IMyLayout) {
  return (
    <div className="relative px-4 bg-background min-h-screen">
      <main>
        <Header />
        {children}
      </main>
    </div>
  )
}

const AdminLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className="flex w-full min-h-screen relative z-50">
      <div className="w-screen h-screen absolute top-0 left-0 gradient-admin -z-50" />

      {children}
    </div>
  )
}

export default AdminLayout

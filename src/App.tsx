import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CustomerApp from './portals/customer/CustomerApp'
import VendorApp from './portals/vendor/VendorApp'
import CourierApp from './portals/courier/CourierApp'
import AdminApp from './portals/admin/AdminApp'
import { useTheme } from './hooks/useTheme'

export default function App() {
  useTheme()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/vendor/*" element={<VendorApp />} />
        <Route path="/courier/*" element={<CourierApp />} />
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="/*" element={<CustomerApp />} />
      </Routes>
    </BrowserRouter>
  )
}

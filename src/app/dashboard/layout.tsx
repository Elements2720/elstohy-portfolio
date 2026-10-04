import './dashboard.css';
import {DashboardShell} from '@/components/dashboard/shell';
export const metadata={title:'Owner dashboard — El-Stohy',robots:{index:false,follow:false}};
export default function DashboardLayout({children}:{children:React.ReactNode}){return <div className="dashboard"><DashboardShell>{children}</DashboardShell></div>;}

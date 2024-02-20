import { Outlet } from 'react-router-dom';
import CustomSidebar from '../components/customs/CustomSidebar/CustomSidebar';

const Layout = () => {
    return (
        <>
            <CustomSidebar />
            <Outlet />
        </>
    )
}

export default Layout
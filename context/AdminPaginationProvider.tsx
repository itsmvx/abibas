'use client';

import { createContext, useState } from "react";

export const AdminPaginationContext = createContext(null);
const AdminPaginationProvider = () => {
    const [ paginationState, setPaginationState] = useState({
        showPerPage: 0,
        paginate: 1
    });
    return (
        <div>

        </div>
    );
};

export default AdminPaginationProvider;

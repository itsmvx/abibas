'use client';
import AdminCategoriesCard from "@/app/admin/categories/AdminCategoriesCard";
import AdminAudiencesTable from "@/app/admin/categories/AdminCategoriesTable";
import useAdminViewModeContext from "@/hooks/useAdminViewModeContext";
import AdminContentHeading from "@/app/components/AdminContentHeading";

type CategoryDataType = {
    _count: {
        products: number
    }
} & CategoriesModelType
const AdminCategoriesContent = ({ categoriesData, webKey }: { categoriesData: CategoryDataType[], webKey: { key: string | null, iv: string | null } }) => {
    const { adminViewMode, setAdminViewMode } = useAdminViewModeContext();

    return (
        <>
            <AdminContentHeading
                adminViewMode={adminViewMode}
                setAdminViewMode={setAdminViewMode}
                tittle="Categories"
                webKey={webKey.key}
            />
            {
                adminViewMode === 'CARD'
                    ? <AdminCategoriesCard categoriesData={categoriesData} webKey={webKey} />
                    : adminViewMode === 'TABLE'
                        ? <AdminAudiencesTable categoriesData={categoriesData} />
                        : <AdminCategoriesCard categoriesData={categoriesData} webKey={webKey}/>
            }
        </>
    );
};

export default AdminCategoriesContent;

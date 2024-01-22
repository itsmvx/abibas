'use client';
import { dateFormat } from "@/lib/DateFormatLib";

type AudienceDataType = {
    _count: {
        products: number
    }
} & AudiencesModelType

const AdminAudiencesTable = ({ audiencesData }: { audiencesData: AudienceDataType[]}) => {
    return (
        <>
            <section className="h-full bg-white border-[0.5px] border-zinc-300 shadow-sm shadow-zinc-400 overflow-x-auto animate-fade animate-duration-[600ms] animate-ease-in-out animate-once">
                <table className="items-center bg-transparent w-full border-collapse">
                    <thead className="font-semibold text-left">
                    <tr>
                        <th className="px-2.5 py-3 text-xs uppercase whitespace-nowrap">
                            No.
                        </th>
                        <th className="px-6 py-3 text-xs uppercase whitespace-nowrap">
                            Audience
                        </th>
                        <th className="max-w-24 flex flex-col px-6 py-3 text-xs uppercase whitespace-nowrap">
                            <p>Total</p>
                            <p>Products</p>
                        </th>
                        <th className="px-6 py-3 text-xs uppercase whitespace-nowrap">
                            Date Created
                        </th>
                        <th className="px-6 py-3 text-xs uppercase whitespace-nowrap">
                            Last Update
                        </th>
                        <th className="px-6 py-3 text-xs uppercase whitespace-nowrap">
                            Actions
                        </th>
                    </tr>
                    </thead>

                    <tbody>
                    {
                        audiencesData && audiencesData.map ((audience: AudienceDataType, index: number) => {
                            return (
                                <tr key={index}>
                                    <td className="text-center text-sm whitespace-nowrap">
                                        {index + 1}
                                    </td>
                                    <td className="indent-2 text-xs whitespace-nowrap p-4">
                                        {audience.name ?? 'Not Set yet'}
                                    </td>
                                    <td className="indent-2 text-xs whitespace-nowrap p-4">
                                        {audience._count.products ?? 0}
                                    </td>
                                    <td className="indent-2 text-xs whitespace-nowrap p-4">
                                        {audience.createdAt ? `${dateFormat (audience.createdAt.toString (), 'YYYY-MM-DD, hh:mm A')}` : '-'}
                                    </td>
                                    <td className="indent-2 text-xs whitespace-nowrap p-4">
                                        {audience.updatedAt ? `${dateFormat (audience.updatedAt.toString (), 'YYYY-MM-DD, hh:mm A')}` : '-'}
                                    </td>
                                    <td className="text-xs whitespace-nowrap p-4">
                                        <div className="relative flex flex-row gap-x-3">
                                            <button
                                                className="group relative w-6 h-6 hover:text-blue-700 transition-colors duration-200 rounded-full">
                                                <iconify-icon width={24} icon="line-md:pencil"></iconify-icon>
                                                <p className="absolute -top-[110%] -left-1.5 text-xs text-white rounded-md bg-neutral-900 scale-100 group-hover:visible invisible px-2 py-1">
                                                    Edit
                                                </p>
                                            </button>

                                            <button
                                                className="peer w-6 h-6 hover:text-red-500 hover:scale-125 transition-scale duration-200 rounded-full">
                                                <iconify-icon width={24} icon="line-md:close-circle"></iconify-icon>
                                            </button>
                                            <p className="absolute -top-[110%] left-5 text-xs text-white rounded-md bg-neutral-900 scale-100 peer-hover:visible invisible px-2 py-1">
                                                Delete
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
            </section>
        </>
    );
};

export default AdminAudiencesTable;

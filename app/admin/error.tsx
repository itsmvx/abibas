'use client';

const Error = ({ error }: { error: Error & { digest?: string }}) => {
    return (
        <div className="w-full min-h-96 border-2 border-red-600 flex flex-col items-center justify-center gap-y-6">
            <h2 className="text-3xl font-semibold">Aww!</h2>
            <p className="text-lg font-medium">{ error.message }</p>
            <button
                // onClick={() => {
                //     error.name
                // }}
            >
                Try again
            </button>
        </div>
    );
};

export default Error;

export const getRouteSegment = (path: string, segment: 1 | 2 | 3 | 4): string  => {
    const paths: string[] = path.replace(/\/$/, '').split('/');
    paths.shift();

    return paths[segment -1];
};
export const checkRouteSegment = (path: string, segment: 1 | 2 | 3 | 4, valueCheck: string ): boolean => {
    const paths: string[] = path.replace(/\/$/, '').split('/');
    paths.shift();

    return paths[segment -1] === valueCheck;
};
export const loadingSpinnerSvg = `
<svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    style="margin: auto; background: rgb(241, 242, 243); display: block; shape-rendering: auto;"
    width="200px"
    height="200px"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
>
    <circle
        cx="50"
        cy="50"
        r="32"
        stroke-width="8"
        stroke="#0a0a0a"
        stroke-linecap="round"
        fill="none"
        stroke-dasharray="50.26548245743669 50.26548245743669"
    >
        <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="1s"
            keyTimes="0;1"
            values="0 50 50;360 50 50"
        />
    </circle>
</svg>
`;

export const loadingSpinnerDataURL = `data:image/svg+xml;base64,${btoa(loadingSpinnerSvg)}`;

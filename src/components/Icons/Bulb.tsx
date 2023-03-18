const Bulb: React.FC = () => {
    return (
        <svg
            className="hover:scale-90"
            height="36"
            style={{ color: "white" }}
            viewBox="0 0 21 21"
            width="36"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g
                fill="none"
                fillRule="evenodd"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="translate(2 1)"
            >
                <path d="m6.5 17.5h4" />
                <path d="m8.5 4c2.4852814 0 4.5 2.01471863 4.5 4.5 0 1.7663751-1.017722 3.2950485-2.4987786 4.031633l-.0012214.968367c0 1.1045695-.8954305 2-2 2s-2-.8954305-2-2l-.00021218-.9678653c-1.48160351-.7363918-2.49978782-2.2653584-2.49978782-4.0321347 0-2.48528137 2.01471863-4.5 4.5-4.5z" />
                <path d="m8.5 1.5v-1" />
                <path d="m13.5 3.5 1-1" />
                <path d="m2.5 3.5 1-1" transform="matrix(-1 0 0 1 6 0)" />
                <path d="m13.5 13.5 1-1" transform="matrix(1 0 0 -1 0 26)" />
                <path d="m2.5 13.5 1-1" transform="matrix(-1 0 0 -1 6 26)" />
                <path d="m1.5 7.5h-1" />
                <path d="m16.5 7.5h-1" />
            </g>
        </svg>
    );
};

export default Bulb;

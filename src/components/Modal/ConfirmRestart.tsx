import ReactModal from "react-modal";

type Props = {
    isOpen: boolean;
    closeModalFunction: () => void;
    restartWordFunction: () => void;
};

const ConfirmRestart: React.FC<Props> = (props) => {
    return (
        <ReactModal
            ariaHideApp={false}
            className={
                "fixed top-1/2 -translate-y-3/4 left-1/2 -translate-x-1/2 bg-gray-900 w-1/4 h-1/5 p-5 rounded-lg mx-auto"
            }
            style={{
                overlay: {
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.80)",
                },
            }}
            isOpen={props.isOpen}
            onRequestClose={props.closeModalFunction}
            shouldCloseOnOverlayClick={true}
            shouldCloseOnEsc={true}
        >
            <div className="w-full h-full flex items-center justify-around flex-col 2xl:py-4">
                <h1 className="text-gray-200 text-3xl 2xl:text-4xl text-center font-semibold">
                    RESTART
                </h1>
                <div className="flex space-x-5 justify-center mt-5">
                    <button
                        className="bg-green-700 py-1 w-16 2xl:w-28 2xl:text-2xl text-white rounded-lg hover:bg-opacity-70"
                        onClick={() => {
                            props.restartWordFunction();
                        }}
                    >
                        Yes
                    </button>
                    <button
                        onClick={props.closeModalFunction}
                        className="bg-red-700 py-1 w-16 2xl:w-28 2xl:text-2xl text-white rounded-lg hover:bg-opacity-70"
                    >
                        No
                    </button>
                </div>
            </div>
        </ReactModal>
    );
};

export default ConfirmRestart;

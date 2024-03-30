import loadingIcon from "../../Spinner.svg";
export interface LoadingComponentProps {
    loading: boolean;
    color: string;
}


const LoadingComponent: React.FC<LoadingComponentProps> = (props) => {
    return (
        <div className={`flex justify-center py-2 text-${props.color}`}>
            {props.loading && (
                <div className="flex">
                    <img src={loadingIcon} alt="Loading Icon" className="animate-spin"/>
                    <span className="ps-2">Loading...</span>
                </div>
            )}
        </div>
    );
};
export default LoadingComponent;

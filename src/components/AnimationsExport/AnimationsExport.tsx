import './AnimationsExport.scss';
import DeleteWebm from "../../assets/animations/Delete.webm";
import FilterIconWebm from "../../assets/animations/FilterIcon.webm";
import AddIconWebm from "../../assets/animations/AddIcon.webm";
import ContactCreateWebm from "../../assets/animations/ContactCreate.webm";
import ResetWebm from "../../assets/animations/reset.webm";
import ApplyWebm from "../../assets/animations/apply.webm";
import InfoWebm from "../../assets/animations/info.webm";
import Uploads from "../../assets/animations/Uploads.webm";
import Table from "../../assets/animations/Table.webm"
import Tabledark from "../../assets/animations/Tabledark.webm"
import CardLight from "../../assets/animations/Cardlight.webm"
import CardDight from "../../assets/animations/CardDark.webm"
import SuccessIcon from "../../assets/animations/Success.webm";

const DeleteAnimation = () => {
    return (
        <video
            autoPlay
            loop
            muted
            className="cls-delete-animation"
        >
            <source src={DeleteWebm} type="video/webm" />
        </video>
    );
};

const FilterIconAnimation = () => {
    return (
        <video
            autoPlay
            loop
            muted
            className="cls-filter-animation"
        >
            <source src={FilterIconWebm} type="video/webm" />
        </video>
    );
};


const AddIconAnimation = () => {
    return (
        <video
            autoPlay
            loop
            muted
            className="cls-addicon-animation"
        >
            <source src={AddIconWebm} type="video/webm" />
        </video>
    );
};

const CreateIconAnimation = () => {
    return (
        <video
            autoPlay
            loop
            muted
            className="cls-addicon-animation"
        >
            <source src={ContactCreateWebm} type="video/webm" />
        </video>
    );
};

const ResetIconAnimation = () => {
    return (
        <video
            autoPlay
            loop
            muted
            className="cls-reseticon-animation"
        >
            <source src={ResetWebm} type="video/webm" />
        </video>
    );
};

const ApplyIconAnimation = () => {
    return (
        <video
            autoPlay
            loop
            muted
            className="cls-applyicon-animation"
        >
            <source src={ApplyWebm} type="video/webm" />
        </video>
    );
};

const InfoIconAnimation = () => {
    return (
        <video
            autoPlay
            loop
            muted
            className="cls-info-icon-animation"
        >
            <source src={InfoWebm} type="video/webm" />
        </video>
    );
};

const UploadsAnimation = () => {
    return (
        <video
            autoPlay
            loop
            muted
            className="cls-upload-icon-animation"
        >
            <source src={Uploads} type="video/webm" />
        </video>
    );
};

const TablelightAnimation = () => {
    return (
        <video
            autoPlay
            loop
            muted
            className="cls-table-icon-animation"
        >
            <source src={Table} type="video/webm" />
        </video>
    );
};
const TabledarkAnimation = () => {
    return (
        <video
            autoPlay
            loop
            muted
            className="cls-table-icon-animation"
        >
            <source src={Tabledark} type="video/webm" />
        </video>
    );
};
const CardlightAnimation = () => {
    return (
        <video
            autoPlay
            loop
            muted
            className="cls-card-icon-animation"
        >
            <source src={CardLight} type="video/webm" />
        </video>
    );
};
const CardDarkAnimation = () => {
    return (
        <video
            autoPlay
            loop
            muted
            className="cls-card-icon-animation"
        >
            <source src={CardDight} type="video/webm" />
        </video>
    );
};

const SuccessAnimation = () => {
    return (
        <video
            autoPlay
            loop
            muted
            className="cls-success-icon-animation"
        >
            <source src={SuccessIcon} type="video/webm" />
        </video>
    );
};

export { DeleteAnimation, FilterIconAnimation, AddIconAnimation, CreateIconAnimation, ResetIconAnimation, ApplyIconAnimation, InfoIconAnimation, UploadsAnimation ,TablelightAnimation,TabledarkAnimation,CardlightAnimation,CardDarkAnimation, SuccessAnimation};
